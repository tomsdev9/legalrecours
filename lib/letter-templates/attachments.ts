import type { CaseId, OrganismKey } from "@/lib/wizard-data"

type Ctx = Record<string, unknown>

/** Retourne une liste de pièces à joindre (phrases simples), adaptées au cas + contexte. */
export function getAttachmentsForCase(
  caseId: CaseId,
  organism: OrganismKey,
  ctx: Ctx
): string[] {
  const ref = (ctx.referenceNumber ? `copie du courrier de décision (réf. ${ctx.referenceNumber})` : "copie du courrier de décision")
  const notifDate = typeof ctx.decisionDate === "string" && ctx.decisionDate ? ` daté du ${ctx.decisionDate}` : ""
  const montant = typeof ctx.amount === "number" ? ` (${ctx.amount.toLocaleString("fr-FR")} €)` : ""

  // Helpers contextuels
  const feuilleSoins = typeof ctx.submissionDate === "string" && ctx.submissionDate
    ? `copie de la feuille de soins papier (envoyée le ${ctx.submissionDate})`
    : "copie de la feuille de soins papier"
  const periode = typeof ctx.period === "string" && ctx.period ? ` sur la période ${ctx.period}` : ""

  const commonIdentity = [
    "copie d’une pièce d’identité",
    "RIB"
  ]

  switch (organism) {
    case "CAF": {
      const alloc = ctx["cafNumber"] ? ` (N° allocataire ${ctx["cafNumber"]})` : ""
      switch (caseId) {
        case "CAF_TROP_PERCU":
          return [ref + notifDate, "copie d’un justificatif de domicile", "justificatifs de ressources/charges pertinentes", "relevé de situation CAF", ...commonIdentity]

        case "CAF_NON_VERSEMENT":
          return [ref + notifDate, "relevé de situation CAF", "justificatifs d’éligibilité (bail, attestation, etc.)", ...commonIdentity]

        case "CAF_REMISE_DETTE":
          return [ref + notifDate, `justificatifs de revenus (RSA, bulletins)`, `justificatifs de charges (loyer/quittance, énergie, forfait mobile, accès internet${periode})`, ...commonIdentity]

        case "CAF_MONTANT_ERREUR":
          return [ref + notifDate, "éléments prouvant le montant correct (ressources/périodes)", "relevé de situation CAF", ...commonIdentity]

        default:
          return [ref + notifDate, ...commonIdentity]
      }
    }

    case "CPAM": {
      switch (caseId) {
        case "CPAM_RETARD_REMBOURSEMENT":
          return [ref + notifDate, "justificatifs des soins (factures, ordonnances)", "relevé de prestations Ameli", ...commonIdentity]

        case "CPAM_REFUS_REMBOURSEMENT":
          return [ref + notifDate, "factures/ordonnances et justificatifs médicaux utiles", "relevé de prestations Ameli", ...commonIdentity]

        case "CPAM_REFUS_ARRET_TRAVAIL":
          return [ref + notifDate, "arrêt(s) de travail et pièces du médecin", "relevé d’indemnités journalières si dispo", ...commonIdentity]

        case "CPAM_FEUILLE_SOINS":
          return [feuilleSoins, "attestation de droits", ...commonIdentity]

        default:
          return [ref + notifDate, ...commonIdentity]
      }
    }

    case "POLE_EMPLOI": {
      switch (caseId) {
        case "POLE_EMPLOI_RADIATION":
          return [ref + notifDate, "convocations/échanges, justificatifs d’empêchement le cas échéant", "attestations employeur utiles", ...commonIdentity]

        case "POLE_EMPLOI_OBSERVATIONS":
          return [ref + notifDate, "pièces répondant point par point aux griefs", ...commonIdentity]

        case "POLE_EMPLOI_TROP_PERCU":
          return [ref + notifDate, "relevés d’indemnisation", "justificatifs de situation et ressources", ...commonIdentity]

        case "POLE_EMPLOI_REFUS_INDEMNISATION":
          return [ref + notifDate, "attestations employeur, contrats, bulletins, PPAE", ...commonIdentity]

        case "POLE_EMPLOI_ATTESTATION_EMPLOYEUR":
          return [ref + notifDate, "preuves des relances à l’employeur", ...commonIdentity]

        default:
          return [ref + notifDate, ...commonIdentity]
      }
    }
  }
}