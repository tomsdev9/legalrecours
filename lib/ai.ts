// /lib/ai.ts
import type { OrganismKey, CaseId } from "@/lib/wizard-data"

/* ─────────────────────── Types ─────────────────────── */
export type ReviseMeta = {
  organism: OrganismKey
  caseId: CaseId
  /** Optionnel : consignes internes (ex: "client pressé", "joindra justificatifs") */
  extraNotes?: string
}

type AnthropicTextBlock = { type: "text"; text: string }
type AnthropicMessageResponse = { content?: AnthropicTextBlock[] }

/* ───────── Nettoyage agressif de la sortie IA (anti “Objet”, anti titres, anti markdown) ───────── */

const RX_SUBJECT_LINE = /^\s*(\*\*|__|#+|\*)?\s*objet\s*[:\-–]\s*.*$/gim
const RX_MARKDOWN_BOLD = /\*\*(.*?)\*\*/g
const RX_MARKDOWN_UNDER = /__(.*?)__/g
const RX_MARKDOWN_HEADERS = /^#{1,6}\s*/gm
const RX_BULLET = /^\s*(?:[-•*]\s+|\d+\)\s+|\d+\.\s+)/gm

// Ligne “titre” probable : courte, sans ponctuation finale, tout en MAJ ou “Title Case”
const RX_PROBABLE_HEADER =
  /^\s*(\*\*|__|#+|\*)?\s*[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9’' \-]{1,60}[:]?(\*\*|__)?\s*$/u

/** Normalise les montants/€ (supprime “/€” et espace correct avant €) */
function normalizeEuroAndThousands(t: string): string {
  // 123/€ -> 123 €
  t = t.replace(/(\d+)\s*\/\s*€/g, "$1 €")
  // 1/200 € -> 1 200 €
  t = t.replace(/(\d)\/(\d{3})(?=\s*€)/g, "$1 $2")
  // espaces corrects avant €
  t = t.replace(/(\d)\s*€/g, "$1 €")
  return t
}

/** Nettoie le texte IA : enlève titres/markdown et “Objet : …” éventuel. */
export function sanitizeLetterBody(raw: string): string {
  let t = (raw ?? "").replace(/\r\n/g, "\n")

  // 1) Enlève toute ligne “Objet: …”
  t = t.replace(RX_SUBJECT_LINE, "")

  // 2) Vire le markdown et les puces
  t = t.replace(RX_MARKDOWN_BOLD, "$1")
  t = t.replace(RX_MARKDOWN_UNDER, "$1")
  t = t.replace(RX_MARKDOWN_HEADERS, "")
  t = t.replace(RX_BULLET, "")

  // 3) Supprime les “titres” isolés (ex: “Situation financière”)
  const lines = t.split("\n").map(l => l.trim())
  const kept: string[] = []
  for (const line of lines) {
    if (!line) continue
    const isHeadingLike =
      RX_PROBABLE_HEADER.test(line) &&
      !/[.;!?]$/.test(line) &&
      line.length <= 60 &&
      !/^madame, monsieur[, ]*$/i.test(line)
    if (isHeadingLike) continue
    kept.push(line)
  }
  t = kept.join("\n")

  // 4) Enlève une politesse finale éventuelle (ajoutée par l’IA)
  t = t.replace(
    /(je vous prie d[’']agréer[^.\n]*\.\s*$|veuillez agréer[^.\n]*\.\s*$|cordialement\.?\s*$|bien cordialement\.?\s*$|sinc(è|e)res?\s+salutations\.?\s*$)/gim,
    ""
  )

  // 5) Compacte proprement
  t = t.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim()

  // 6) Préfixe d’appel si manquant
  if (!/^(madame|monsieur)/i.test(t)) {
    t = `Madame, Monsieur,\n\n${t}`
  }

  // 7) Normalisation montants/€
  t = normalizeEuroAndThousands(t)
  return t
}

/* ───────── Consignes IA ───────── */
const BASE_POLICY = [
  "Tu es juriste en droit administratif français.",
  "Tu améliores un courrier déjà rédigé : ton formel, clair, non agressif.",
  "N'invente AUCUN fait. Ne modifie pas montants, dates, numéros, références (protégés entre [[...]]).",
  "Ne cite pas d’articles de loi non fournis par le brouillon.",
  // IMPORTANT → le PDF ajoute déjà Objet + politesse + signature
  'NE crée PAS de ligne « Objet ». N’ajoute PAS de formule de politesse ni de signature.',
  "Pas de titres, pas de listes, pas de markdown.",
  "Paragraphes simples uniquement, 120 à 170 mots maximum (si plus long, résume et fusionne).",
].join("\n")

const ORGANISM_POLICIES: Record<OrganismKey, readonly string[]> = {
  CAF: [
    "Structure courte : faits → désaccord → demande (annulation/réexamen/remise/échéancier).",
    "Mentionne la suspension du recouvrement pendant réexamen si pertinent.",
  ] as const,
  CPAM: [
    "Reste factuel sur soins/arrêts, n’ajoute aucun acte non mentionné.",
    "Demande un réexamen motivé et remboursement/prise en charge si justifié.",
  ] as const,
  POLE_EMPLOI: [
    "Rappelle la volonté de respecter les obligations, conteste si inexact.",
    "Pour radiation/refus ARE : demande réexamen prioritaire et rétablissement des droits si fondé.",
  ] as const,
}

const CASE_POLICIES: Record<CaseId, readonly string[]> = {
  // CAF
  CAF_TROP_PERCU: [
    "Demande l’annulation du trop-perçu s’il est contesté, sinon remise gracieuse/échéancier selon situation.",
    "Demande la suspension du recouvrement pendant l’instruction.",
  ] as const,
  CAF_NON_VERSEMENT: [
    "Demande le versement des arriérés et la régularisation des droits.",
    "Rappelle brièvement la chronologie et la prestation concernée.",
  ] as const,
  CAF_REMISE_DETTE: [
    "Mets en avant les difficultés financières, propose un échéancier si besoin.",
    "Reste factuel sur le montant et la cause de la dette (sans la contester ici).",
  ] as const,
  CAF_MONTANT_ERREUR: [
    "Souligne l’écart entre montant attendu et perçu, demande correction et rattrapage.",
    "Rappelle les éléments factuels (ressources/périodes) sans en inventer.",
  ] as const,

  // CPAM
  CPAM_RETARD_REMBOURSEMENT: [
    "Demande un traitement rapide du remboursement.",
    "Rappelle la date des soins et, si connu, le montant attendu.",
  ] as const,
  CPAM_REFUS_REMBOURSEMENT: [
    "Conteste le refus avec les éléments fournis, sans inventer d’actes.",
    "Demande un réexamen motivé et la prise en charge si justifiée.",
  ] as const,
  CPAM_REFUS_ARRET_TRAVAIL: [
    "Reste sobre sur l’état de santé, conteste la décision du médecin-conseil.",
    "Demande réexamen/avis complémentaire et indemnisation si fondée.",
  ] as const,
  CPAM_FEUILLE_SOINS: [
    "Rappelle l’envoi de la feuille de soins papier.",
    "Demande traitement/régularisation et, le cas échéant, remboursement.",
  ] as const,

  // Pôle Emploi
  POLE_EMPLOI_RADIATION: [
    "Conteste la radiation, explique la situation réelle (empêchement, justificatif…).",
    "Demande annulation de la décision et rétablissement des droits.",
  ] as const,
  POLE_EMPLOI_OBSERVATIONS: [
    "Formule des observations courtes et précises en réponse à la mise en demeure (délai 10 jours).",
    "Réponds point par point aux griefs sans en ajouter.",
  ] as const,
  POLE_EMPLOI_TROP_PERCU: [
    "Demande annulation si non fondé ; sinon remise gracieuse/échéancier selon la situation.",
    "Demande suspension du recouvrement pendant l’étude.",
  ] as const,
  POLE_EMPLOI_REFUS_INDEMNISATION: [
    "Conteste le refus ARE avec les faits fournis.",
    "Demande réexamen prioritaire et ouverture des droits si fondé.",
  ] as const,
  POLE_EMPLOI_ATTESTATION_EMPLOYEUR: [
    "Demande assistance pour obtenir l’attestation employeur manquante et régulariser.",
    "Mentionne les relances déjà faites de façon factuelle.",
  ] as const,
}

/* ───────── Helpers ───────── */
function buildSystem(meta: ReviseMeta): string {
  const org = ORGANISM_POLICIES[meta.organism] ?? []
  const cas = CASE_POLICIES[meta.caseId] ?? []
  const extra = meta.extraNotes ? [`Note interne: ${meta.extraNotes}`] : []
  return [BASE_POLICY, ...org, ...cas, ...extra].map(l => `- ${l}`).join("\n")
}

/** Protège dates/montants/références pour éviter toute altération par l’IA */
function protectDraft(draft: string): string {
  return draft
    // dates FR (JJ/MM/AAAA ou JJ/MM/AA)
    .replace(/(\b\d{1,2}\/\d{1,2}\/\d{2,4}\b)/g, "[[$1]]")
    // dates ISO (AAAA-MM-JJ)
    .replace(/(\b\d{4}-\d{2}-\d{2}\b)/g, "[[$1]]")
    // montants en euros
    .replace(/(\b\d[\d\s]*[.,]?\d*\s?€\b)/g, "[[$1]]")
    // numéros / références (N°|No|Numéro|Réf.)
    .replace(/(\b(?:N°|No|Numéro|Réf\.?)\s?[A-Za-z0-9\-_/]+)\b/g, "[[$1]]")
}

/* ───────── Appel API ───────── */
export async function reviseLetterWithAI(draft: string, meta: ReviseMeta): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return sanitizeLetterBody(draft)

  const system = buildSystem(meta)
  const protectedDraft = protectDraft(draft)

  const user = [
    `# Meta`,
    JSON.stringify(meta, null, 2),
    ``,
    `# Brouillon à réviser (ne pas modifier ce qui est entre [[...]] )`,
    `<<<`,
    protectedDraft,
    `>>>`,
    ``,
    `# Sortie`,
    `RENVOIE UNIQUEMENT LE CORPS DE LETTRE (sans "Objet", sans politesse, sans signature, sans markdown). 120–170 mots maximum.`,
  ].join("\n")

  const headers: HeadersInit = {
    "content-type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  }

  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 900,
    system,
    messages: [{ role: "user", content: user }],
  }

  let textOut = draft
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error("Anthropic error:", res.status, await res.text().catch(() => ""))
      return sanitizeLetterBody(draft)
    }

    const json = (await res.json()) as AnthropicMessageResponse
    const block = json?.content?.find(c => c?.type === "text" && typeof c.text === "string")
    textOut = block?.text ?? draft
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Anthropic fetch failed:", err)
    textOut = draft
  }

  return sanitizeLetterBody(textOut)
}

/** Retire la protection [[...]] après révision */
export function stripProtectionBrackets(text: string): string {
  return text.replace(/\[\[(.+?)\]\]/g, "$1")
}
