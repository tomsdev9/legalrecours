// /lib/letter-templates/families.ts

/** CAF — Trop-perçu */
export const CAF_TROP_PERCU = `
{{HEADER}}
{{DEST}}

À {{city}}, le {{today}}

Objet : {{subject}}

Madame, Monsieur,

Je conteste le trop-perçu d’un montant de {{amount}} € notifié le {{decisionDate}} pour la période {{period}} (réf. {{referenceNumber}}).
Motif indiqué : {{reasonGiven}}.

Ma situation :
{{yourExplanation}}

Pièces jointes : {{proofs}}

En conséquence, je vous demande {{desiredOutcomeText}}.

{{SIGNATURE}}
`.trim()

/** CAF — Non-versement / Erreur de montant (même squelette, sujet dynamique) */
export const CAF_NON_VERSEMENT = `
{{HEADER}}
{{DEST}}

À {{city}}, le {{today}}

Objet : {{subject}}

Madame, Monsieur,

Je vous saisis concernant {{subjectDetail}} (réf. {{referenceNumber}}) notifié(e) le {{decisionDate}}.
{{amountBlock}}

Motif indiqué : {{reasonGiven}}.

Ma situation :
{{yourExplanation}}

Démarches déjà effectuées : {{priorStepsLabel}}

Demande : {{desiredOutcomeText}}

{{SIGNATURE}}
`.trim()

/** CAF — Remise de dette */
export const CAF_REMISE_DETTE = `
{{HEADER}}
{{DEST}}

À {{city}}, le {{today}}

Objet : {{subject}}

Madame, Monsieur,

Je sollicite une remise de dette d’un montant de {{amount}} € (réf. {{referenceNumber}}), notifiée le {{decisionDate}}.

Difficultés financières :
{{financialHardship}}

Demande : {{desiredOutcomeText}}

{{SIGNATURE}}
`.trim()

/** CPAM — Remboursements (retard, refus, feuille de soins, arrêt de travail) */
export const CPAM_REMBOURSEMENT = `
{{HEADER}}
{{DEST}}

À {{city}}, le {{today}}

Objet : {{subject}}

Madame, Monsieur,

Je vous saisis au sujet du dossier référencé {{referenceNumber}}.

{{careBlock}}
{{submissionBlock}}
{{actBlock}}

Motif indiqué : {{reasonGiven}}

Ma situation :
{{yourExplanation}}

Demande : {{desiredOutcomeText}}

{{SIGNATURE}}
`.trim()

/** Pôle Emploi — Radiation / Observations / Refus indemnisation */
export const PE_RADIATION = `
{{HEADER}}
{{DEST}}

À {{city}}, le {{today}}

Objet : {{subject}}

Madame, Monsieur,

Au titre du dossier {{referenceNumber}}, je vous adresse la présente concernant {{topicDetail}}.

Motif / éléments de la décision :
{{reasonGiven}}

Mes observations :
{{observations}}

Éléments complémentaires :
{{rightsInfo}}

Demande : {{desiredOutcomeText}}

{{SIGNATURE}}
`.trim()

/** Pôle Emploi — Trop-perçu / (famille dédiée) */
export const PE_TROP_PERCU = `
{{HEADER}}
{{DEST}}

À {{city}}, le {{today}}

Objet : {{subject}}

Madame, Monsieur,

Je conteste le trop-perçu d’un montant de {{amount}} € notifié le {{decisionDate}} (réf. {{referenceNumber}}).
Motif indiqué : {{reasonGiven}}.

Ma situation :
{{yourExplanation}}

Pièces jointes : {{proofs}}

Demande : {{desiredOutcomeText}}

{{SIGNATURE}}
`.trim()

/** Pôle Emploi — Attestation employeur manquante (famille à part) */
export const PE_ATTESTATION_EMPLOYEUR = `
{{HEADER}}
{{DEST}}

À {{city}}, le {{today}}

Objet : {{subject}}

Madame, Monsieur,

Dans le cadre du dossier {{referenceNumber}}, l’attestation employeur de {{employerName}} n’a pas été transmise à ce jour, empêchant le traitement de mon indemnisation.

Relances effectuées :
{{relances}}

Je vous remercie de bien vouloir procéder au traitement de mon dossier et, le cas échéant, de prendre attache auprès de l’employeur pour régulariser la situation.

{{SIGNATURE}}
`.trim()
