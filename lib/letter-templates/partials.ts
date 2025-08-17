// /lib/letter-templates/partials.ts

/** En-tête expéditeur, garde {{optionalLine}} pour des ID (CAF, CPAM, etc.) */
export const HEADER = `
{{firstName}} {{lastName}}
{{address}}
{{zipCode}} {{city}}
{{optionalLine}}
`.trim()

/** Destinataires génériques (tu pourras affiner plus tard par département) */
export const DEST_CAF = `CAF – Service Recours`
export const DEST_CPAM = `CPAM – Service Gestion`
export const DEST_PE = `Pôle Emploi – Service Indemnisation`

/** Signature standard */
export const SIGNATURE = `
Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.

{{firstName}} {{lastName}}
`.trim()
