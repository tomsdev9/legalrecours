// /lib/pipeline.ts
import { getTemplateForCase, injectPartials, buildSubject } from "@/lib/letter-templates"
import { renderTemplate, cleanupText } from "./letter-templates/templating"
import { reviseLetterWithAI, stripProtectionBrackets } from "@/lib/ai"
// Si tu as un type CaseId exporté ; sinon remplace par `string`
import type { CaseId } from "@/lib/wizard-data"

export type Organism = "CAF" | "CPAM" | "POLE_EMPLOI"

export type WizardPayload = {
  selectedOrganism: Organism
  selectedCase: CaseId | string
  contextData: Record<string, unknown>
  userInfo: {
    firstName: string
    lastName: string
    address: string
    city: string
    zipCode: string
    email?: string
    phone?: string
    cafNumber?: string
    cpamNumber?: string
    poleEmploiNumber?: string
  }
}

export function makeDraftFromWizard(payload: WizardPayload) {
  const base = getTemplateForCase(payload.selectedCase as CaseId)
  const withPartials = injectPartials(base, payload.selectedOrganism)
  const subject = buildSubject(payload.selectedCase as CaseId, payload.contextData as Record<string, string>)

  const data = {
    firstName: payload.userInfo.firstName,
    lastName: payload.userInfo.lastName,
    address: payload.userInfo.address,
    zipCode: payload.userInfo.zipCode,
    city: payload.userInfo.city,
    today: new Date().toLocaleDateString("fr-FR"),

    optionalLine:
      payload.selectedOrganism === "CAF"
        ? `N° allocataire : ${payload.userInfo.cafNumber ?? ""}`
        : payload.selectedOrganism === "CPAM"
        ? `N° sécu : ${payload.userInfo.cpamNumber ?? ""}`
        : `Identifiant Pôle Emploi : ${payload.userInfo.poleEmploiNumber ?? ""}`,

    subject,

    referenceNumber: asStr(payload.contextData["referenceNumber"]),
    amount: asStr(payload.contextData["amount"]),
    amountDiff: asStr(payload.contextData["amountDiff"]),
    expectedAmount: asStr(payload.contextData["expectedAmount"]),
    period: asStr(payload.contextData["period"]),
    decisionDate: asStr(payload.contextData["decisionDate"]),
    reasonGiven: asStr(payload.contextData["reasonGiven"]),
    yourExplanation: asStr(payload.contextData["yourExplanation"]),
    proofs: asStr(payload.contextData["proofs"], "—"),

    priorStepsLabel: mapPriorSteps(asStr(payload.contextData["priorSteps"])),
    desiredOutcomeText: mapOutcome(asStr(payload.contextData["desiredOutcome"])),

    amountBlock:
      payload.contextData["expectedAmount"]
        ? `Montant attendu : ${payload.contextData["expectedAmount"]} €`
        : payload.contextData["amountDiff"]
        ? `Écart constaté : ${payload.contextData["amountDiff"]} €`
        : "",

    careBlock: payload.contextData["careDate"] ? `Date des soins : ${payload.contextData["careDate"]}` : "",
    submissionBlock: payload.contextData["submissionDate"] ? `Date d’envoi de la feuille de soins : ${payload.contextData["submissionDate"]}` : "",
    actBlock: payload.contextData["actType"] ? `Acte concerné : ${payload.contextData["actType"]}` : "",

    topicDetail:
      payload.selectedCase === "POLE_EMPLOI_RADIATION"
        ? "une décision de radiation"
        : payload.selectedCase === "POLE_EMPLOI_OBSERVATIONS"
        ? "des observations écrites dans le délai imparti"
        : payload.selectedCase === "POLE_EMPLOI_REFUS_INDEMNISATION"
        ? "un refus d’indemnisation"
        : "la décision vous concernant",
    observations: asStr(payload.contextData["observations"]),
    rightsInfo: asStr(payload.contextData["rightsInfo"]),
    employerName: asStr(payload.contextData["employerName"]),
    relances: asStr(payload.contextData["relances"]),
  }

  const merged = renderTemplate(withPartials, data)
  return cleanupText(merged)
}

export async function finalizeWithAI(
  draft: string,
  meta: { organism: Organism; caseId: CaseId | string }
) {
  const revised = await reviseLetterWithAI(draft, { organism: meta.organism, caseId: String(meta.caseId) })
  const cleaned = stripProtectionBrackets(revised)
  return cleanupText(cleaned)
}

/* helpers */
function asStr(v: unknown, fallback = "") { return v == null ? fallback : String(v) }
function mapPriorSteps(v: string) {
  const m: Record<string, string> = { aucune: "Aucune", reclamation: "Réclamation simple", appel: "Appel / Téléphone", mail: "Mail / Espace en ligne" }
  return m[v] ?? "Non précisé"
}
function mapOutcome(v: string) {
  const m: Record<string, string> = {
    annulation: "l’annulation de la décision",
    reexamen: "un réexamen du dossier",
    remboursement: "le remboursement / rétablissement des droits",
    remise: "une remise de dette",
    echeancier: "un échéancier de paiement",
    ouverture: "l’ouverture de droits ARE",
  }
  return m[v] ?? "un réexamen de la situation"
}
