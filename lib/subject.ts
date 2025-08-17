// /lib/subjects.ts
import type { CaseId } from "@/lib/wizard-data"

export function subjectForCase(caseId: CaseId, context: Record<string, unknown>): string {
  const ref = context["referenceNumber"] ? ` – réf. ${String(context["referenceNumber"])}` : ""
  switch (caseId) {
    case "CAF_TROP_PERCU":
      return `Contestation de trop-perçu CAF${ref}`
    case "CAF_NON_VERSEMENT":
      return `Réclamation non-versement de prestation CAF${ref}`
    case "CAF_REMISE_DETTE":
      return `Demande de remise de dette CAF${ref}`
    case "CAF_MONTANT_ERREUR":
      return `Contestation d’erreur de calcul CAF${ref}`
    case "CPAM_RETARD_REMBOURSEMENT":
      return `Réclamation retard de remboursement CPAM${ref}`
    case "CPAM_REFUS_REMBOURSEMENT":
      return `Contestation refus de remboursement CPAM${ref}`
    case "CPAM_REFUS_ARRET_TRAVAIL":
      return `Contestation décision médecin-conseil (arrêt travail)${ref}`
    case "CPAM_FEUILLE_SOINS":
      return `Remboursement feuille de soins – demande de régularisation${ref}`
    case "POLE_EMPLOI_RADIATION":
      return `Contestation de radiation Pôle Emploi${ref}`
    case "POLE_EMPLOI_OBSERVATIONS":
      return `Observations écrites – réponse à mise en demeure${ref}`
    case "POLE_EMPLOI_TROP_PERCU":
      return `Contestation de trop-perçu Pôle Emploi${ref}`
    case "POLE_EMPLOI_REFUS_INDEMNISATION":
      return `Contestation refus d’indemnisation ARE${ref}`
    case "POLE_EMPLOI_ATTESTATION_EMPLOYEUR":
      return `Attestation employeur manquante – demande de régularisation${ref}`
  }
}
