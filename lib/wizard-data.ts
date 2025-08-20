// lib/wizard-data.ts

/* ========= Types minimaux ========= */

export type WizardStep = {
  id: number
  title: string
  description: string
}

export type ContextField = {
  id: string
  label: string
  type: "text" | "textarea" | "date" | "number" | "select"
  required?: boolean
  placeholder?: string
  help?: string
  options?: { label: string; value: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

export type OrganismKey = "CAF" | "CPAM" | "POLE_EMPLOI"

export type CaseId =
  | "CAF_TROP_PERCU"
  | "CAF_NON_VERSEMENT"
  | "CAF_REMISE_DETTE"
  | "CAF_MONTANT_ERREUR"
  | "CPAM_RETARD_REMBOURSEMENT"
  | "CPAM_REFUS_REMBOURSEMENT"
  | "CPAM_REFUS_ARRET_TRAVAIL"
  | "CPAM_FEUILLE_SOINS"
  | "POLE_EMPLOI_RADIATION"
  | "POLE_EMPLOI_OBSERVATIONS"
  | "POLE_EMPLOI_TROP_PERCU"
  | "POLE_EMPLOI_REFUS_INDEMNISATION"
  | "POLE_EMPLOI_ATTESTATION_EMPLOYEUR"

export type CaseData = {
  id: CaseId
  organism: OrganismKey
  title: string
  description: string
}

/* ========= Organismes ========= */

export const ORGANISMS = {
  CAF: {
    key: "CAF",
    name: "Caisse d’Allocations Familiales",
    shortName: "CAF",
    description:
      "Allocations (APL, RSA, Prime d’activité), gestion des droits et régularisations.",
  },
  CPAM: {
    key: "CPAM",
    name: "Caisse Primaire d’Assurance Maladie",
    shortName: "CPAM",
    description:
      "Remboursements de soins, arrêts de travail, relations avec le médecin-conseil.",
  },
  POLE_EMPLOI: {
    key: "POLE_EMPLOI",
    name: "France Travail",
    shortName: "France Travail",
    description:
      "Indemnisation ARE, radiations, attestations employeur et réexamens de droits.",
  },
} as const

/* ========= Étapes du wizard ========= */

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    title: "Choix de l’organisme",
    description:
      "Sélectionnez l’organisme avec lequel vous avez un litige (CAF, CPAM, Pôle Emploi).",
  },
  {
    id: 2,
    title: "Votre problème",
    description: "Choisissez le cas précis qui correspond à votre situation.",
  },
  {
    id: 3,
    title: "Détails de votre situation",
    description:
      "Renseignez les informations nécessaires pour générer un courrier précis et conforme.",
  },
  {
    id: 4,
    title: "Vos informations",
    description:
      "Renseignez vos coordonnées pour personnaliser le document et l’envoi.",
  },
  {
    id: 5,
    title: "Vérification & paiement",
    description:
      "Vérifiez l’aperçu du courrier puis réglez 7,90€ pour recevoir le PDF immédiatement.",
  },
]

/* ========= Cas (13) ========= */

export const CASES: Record<CaseId, CaseData> = {
  // CAF
  CAF_TROP_PERCU: {
    id: "CAF_TROP_PERCU",
    organism: "CAF",
    title: "Contestation de trop-perçu",
    description:
      "Vous contestez un trop-perçu (montant, période, motif) et demandez annulation/réexamen.",
  },
  CAF_NON_VERSEMENT: {
    id: "CAF_NON_VERSEMENT",
    organism: "CAF",
    title: "Réclamation non-versement",
    description:
      "Une prestation (APL, RSA, Prime) n’a pas été versée ou avec du retard important.",
  },
  CAF_REMISE_DETTE: {
    id: "CAF_REMISE_DETTE",
    organism: "CAF",
    title: "Demande de remise de dette",
    description:
      "Vous demandez une remise totale/partielle ou un échéancier pour une dette CAF.",
  },
  CAF_MONTANT_ERREUR: {
    id: "CAF_MONTANT_ERREUR",
    organism: "CAF",
    title: "Contestation de montant calculé",
    description:
      "Vous estimez que le montant de votre prestation a été mal calculé (ressources, droit).",
  },

  // CPAM
  CPAM_RETARD_REMBOURSEMENT: {
    id: "CPAM_RETARD_REMBOURSEMENT",
    organism: "CPAM",
    title: "Réclamation retard remboursement",
    description:
      "Remboursement de soins très en retard, vous demandez un traitement rapide.",
  },
  CPAM_REFUS_REMBOURSEMENT: {
    id: "CPAM_REFUS_REMBOURSEMENT",
    organism: "CPAM",
    title: "Contestation refus de remboursement",
    description:
      "Refus de prise en charge d’un acte/soin. Vous contestez et motivez avec justificatifs.",
  },
  CPAM_REFUS_ARRET_TRAVAIL: {
    id: "CPAM_REFUS_ARRET_TRAVAIL",
    organism: "CPAM",
    title: "Contestation décision médecin-conseil",
    description:
      "Refus d’indemnisation d’un arrêt de travail : vous demandez réexamen/justifications.",
  },
  CPAM_FEUILLE_SOINS: {
    id: "CPAM_FEUILLE_SOINS",
    organism: "CPAM",
    title: "Remboursement feuille de soins",
    description:
      "Problème avec une feuille de soins (papier), remboursement absent ou retardé.",
  },

  // Pôle Emploi
  POLE_EMPLOI_RADIATION: {
    id: "POLE_EMPLOI_RADIATION",
    organism: "POLE_EMPLOI",
    title: "Contestation de radiation",
    description:
      "Vous contestez une radiation et demandez l’annulation/le réexamen de la décision.",
  },
  POLE_EMPLOI_OBSERVATIONS: {
    id: "POLE_EMPLOI_OBSERVATIONS",
    organism: "POLE_EMPLOI",
    title: "Observations écrites (10 jours)",
    description:
      "Réponse à mise en demeure/observations dans le délai imparti (10 jours).",
  },
  POLE_EMPLOI_TROP_PERCU: {
    id: "POLE_EMPLOI_TROP_PERCU",
    organism: "POLE_EMPLOI",
    title: "Contestation de trop-perçu",
    description:
      "Trop-perçu ARE : vous contestez ou demandez remise de dette/échéancier.",
  },
  POLE_EMPLOI_REFUS_INDEMNISATION: {
    id: "POLE_EMPLOI_REFUS_INDEMNISATION",
    organism: "POLE_EMPLOI",
    title: "Contestation refus d’indemnisation",
    description:
      "ARE refusée : vous demandez ouverture de droits ou réexamen du dossier.",
  },
  POLE_EMPLOI_ATTESTATION_EMPLOYEUR: {
    id: "POLE_EMPLOI_ATTESTATION_EMPLOYEUR",
    organism: "POLE_EMPLOI",
    title: "Réclamation attestation employeur",
    description:
      "L’attestation employeur manque ou n’est pas transmise : relance et demande de traitement.",
  },
}

/* Helpers cas */
export const CASE_LIST: CaseData[] = Object.values(CASES)

/** getCaseById */
export function getCaseById(id: string | undefined): CaseData | undefined {
  if (!id) return undefined
  return CASES[id as CaseId]
}

/** ✅ Manquante chez toi : utilisée par CaseStep */
export function getCasesByOrganism(organism?: string): CaseData[] {
  if (!organism) return []
  // on tolère string pour éviter un conflit de types
  const org = organism as OrganismKey
  return CASE_LIST.filter(c => c.organism === org)
}

/* ========= Champs de contexte (étape 3) ========= */

const COMMON_FIELDS: ContextField[] = [
  {
    id: "decisionDate",
    label: "Date de la décision / notification",
    type: "date",
    required: true,
    help: "La date figurant sur le courrier ou la notification reçue.",
  },
  {
    id: "referenceNumber",
    label: "Référence du courrier",
    type: "text",
    required: true,
    placeholder: "ex : INS 0001 (CAF) • DCM/2025/123456 (CPAM) • RADI/10J/2025/123456 (Pôle Emploi)",
    help:
      "Copiez la RÉFÉRENCE telle qu’elle apparaît sur votre courrier. Ce n’est pas votre numéro allocataire / n° de sécurité sociale / identifiant Pôle Emploi.",
  }
  ,
  {
    id: "amount",
    label: "Montant concerné (si applicable)",
    type: "number",
    required: false,
    placeholder: "ex : 650",
    validation: { min: 0, message: "Le montant doit être positif" },
  },
  {
    id: "reasonGiven",
    label: "Motif indiqué par l’organisme",
    type: "textarea",
    required: true,
    placeholder: "Copiez les passages clés du courrier reçu.",
  },
  {
    id: "yourExplanation",
    label: "Votre situation réelle (explication)",
    type: "textarea",
    required: true,
    placeholder:
      "Expliquez précisément pourquoi la décision est injustifiée / inexacte.",
  },
  {
    id: "priorSteps",
    label: "Démarches déjà effectuées",
    type: "select",
    required: true,
    options: [
      { label: "Aucune", value: "aucune" },
      { label: "Réclamation simple", value: "reclamation" },
      { label: "Appel / Téléphone", value: "appel" },
      { label: "Mail / Espace en ligne", value: "mail" },
    ],
  },
  {
    id: "desiredOutcome",
    label: "Ce que vous demandez",
    type: "select",
    required: true,
    options: [
      { label: "Réexamen de la situation", value: "reexamen" },
      { label: "Annulation de la décision", value: "annulation" },
      { label: "Remboursement / rétablissement des droits", value: "remboursement" },
      { label: "Remise de dette / échéancier", value: "remise" },
    ],
  },
]

const FIELDS_BY_CASE: Partial<Record<CaseId, ContextField[]>> = {
  // CAF
  CAF_TROP_PERCU: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "amount",
      label: "Montant du trop-perçu",
      type: "number",
      required: true,
      validation: { min: 0, message: "Montant invalide" },
    },
    {
      id: "period",
      label: "Période concernée",
      type: "text",
      required: true,
      placeholder: "ex : Janvier à Mars 2025",
    },
    COMMON_FIELDS[3],
    COMMON_FIELDS[4],
    {
      id: "proofs",
      label: "Pièces justificatives mentionnées",
      type: "textarea",
      required: false,
      placeholder: "bail, fiches de paie, attestation employeur…",
    },
    {
      id: "desiredOutcome",
      label: "Ce que vous demandez",
      type: "select",
      required: true,
      options: [
        { label: "Annulation du trop-perçu", value: "annulation" },
        { label: "Réexamen du dossier", value: "reexamen" },
        { label: "Remise de dette (partielle/totale)", value: "remise" },
        { label: "Échelonnement", value: "echeancier" },
      ],
    },
  ],
  CAF_NON_VERSEMENT: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "benefit",
      label: "Prestation non versée",
      type: "select",
      required: true,
      options: [
        { label: "APL", value: "apl" },
        { label: "RSA", value: "rsa" },
        { label: "Prime d’activité", value: "prime" },
        { label: "Autre", value: "autre" },
      ],
    },
    {
      id: "expectedAmount",
      label: "Montant attendu (si connu)",
      type: "number",
      required: false,
      validation: { min: 0 },
    },
    COMMON_FIELDS[3],
    COMMON_FIELDS[4],
    COMMON_FIELDS[6],
  ],
  CAF_REMISE_DETTE: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "amount",
      label: "Montant de la dette",
      type: "number",
      required: true,
      validation: { min: 0 },
    },
    {
      id: "financialHardship",
      label: "Difficultés financières (charges, revenus…)",
      type: "textarea",
      required: true,
    },
    {
      id: "desiredOutcome",
      label: "Demande",
      type: "select",
      required: true,
      options: [
        { label: "Remise totale", value: "totale" },
        { label: "Remise partielle", value: "partielle" },
        { label: "Échelonnement", value: "echeancier" },
      ],
    },
  ],
  CAF_MONTANT_ERREUR: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "amountDiff",
      label: "Écart de montant constaté",
      type: "number",
      required: true,
      validation: { min: 0 },
    },
    COMMON_FIELDS[3],
    COMMON_FIELDS[4],
    COMMON_FIELDS[6],
  ],

  // CPAM
  CPAM_RETARD_REMBOURSEMENT: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "careDate",
      label: "Date des soins",
      type: "date",
      required: true,
    },
    {
      id: "amount",
      label: "Montant attendu (si connu)",
      type: "number",
      required: false,
      validation: { min: 0 },
    },
    COMMON_FIELDS[4],
    COMMON_FIELDS[6],
  ],
  CPAM_REFUS_REMBOURSEMENT: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "actType",
      label: "Type d’acte (soin, médicament…)",
      type: "text",
      required: true,
    },
    COMMON_FIELDS[3],
    COMMON_FIELDS[4],
    COMMON_FIELDS[6],
  ],
  CPAM_REFUS_ARRET_TRAVAIL: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "workStopStart",
      label: "Début de l’arrêt de travail",
      type: "date",
      required: true,
    },
    {
      id: "workStopEnd",
      label: "Fin de l’arrêt (si connue)",
      type: "date",
      required: false,
    },
    COMMON_FIELDS[3],
    COMMON_FIELDS[4],
    COMMON_FIELDS[6],
  ],
  CPAM_FEUILLE_SOINS: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "submissionDate",
      label: "Date d’envoi de la feuille de soins",
      type: "date",
      required: true,
    },
    COMMON_FIELDS[4],
    COMMON_FIELDS[6],
  ],

  // Pôle Emploi
  POLE_EMPLOI_RADIATION: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "radiationReason",
      label: "Motif de radiation indiqué",
      type: "textarea",
      required: true,
    },
    COMMON_FIELDS[4],
    {
      id: "desiredOutcome",
      label: "Ce que vous demandez",
      type: "select",
      required: true,
      options: [
        { label: "Annulation de la radiation", value: "annulation" },
        { label: "Réexamen / réinscription", value: "reexamen" },
      ],
    },
  ],
  POLE_EMPLOI_OBSERVATIONS: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "miseEnDemeureDate",
      label: "Date du courrier de mise en demeure",
      type: "date",
      required: true,
    },
    {
      id: "observations",
      label: "Vos observations écrites",
      type: "textarea",
      required: true,
      placeholder: "Répondez point par point à ce qui vous est reproché.",
    },
  ],
  POLE_EMPLOI_TROP_PERCU: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "amount",
      label: "Montant du trop-perçu",
      type: "number",
      required: true,
      validation: { min: 0 },
    },
    COMMON_FIELDS[3],
    COMMON_FIELDS[4],
    {
      id: "desiredOutcome",
      label: "Ce que vous demandez",
      type: "select",
      required: true,
      options: [
        { label: "Annulation du trop-perçu", value: "annulation" },
        { label: "Réexamen", value: "reexamen" },
        { label: "Remise de dette / échéancier", value: "remise" },
      ],
    },
  ],
  POLE_EMPLOI_REFUS_INDEMNISATION: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "lastEmploymentEnd",
      label: "Date de fin du dernier contrat",
      type: "date",
      required: true,
    },
    {
      id: "rightsInfo",
      label: "Infos sur droits (si connues)",
      type: "textarea",
      required: false,
      placeholder: "Ancienneté, heures cumulées, statut…",
    },
    COMMON_FIELDS[3],
    COMMON_FIELDS[4],
    {
      id: "desiredOutcome",
      label: "Ce que vous demandez",
      type: "select",
      required: true,
      options: [
        { label: "Ouverture de droits ARE", value: "ouverture" },
        { label: "Réexamen du dossier", value: "reexamen" },
      ],
    },
  ],
  POLE_EMPLOI_ATTESTATION_EMPLOYEUR: [
    COMMON_FIELDS[0],
    COMMON_FIELDS[1],
    {
      id: "employerName",
      label: "Nom de l’employeur",
      type: "text",
      required: true,
    },
    {
      id: "relances",
      label: "Relances déjà effectuées (dates/canaux)",
      type: "textarea",
      required: false,
    },
    COMMON_FIELDS[6],
  ],
}

/* ========= API champs ========= */
export function getContextFields(caseId?: string): ContextField[] {
  if (!caseId) return COMMON_FIELDS
  return FIELDS_BY_CASE[caseId as CaseId] ?? COMMON_FIELDS
}
