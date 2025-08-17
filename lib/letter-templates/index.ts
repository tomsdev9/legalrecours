// /lib/letter-templates/index.ts
import type { CaseId, OrganismKey } from "@/lib/wizard-data"
import { renderTemplate, cleanupText } from "@/lib/letter-templates/templating"

export type BuildArgs = {
  organism: OrganismKey
  caseId: CaseId
  context: Record<string, unknown>
  user: {
    firstName: string
    lastName: string
    address: string
    city: string
    zipCode: string
  }
}

const BASE_SIGNOFF =
  "Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées."

// destinataires (MVP générique et safe)
function destForOrganism(org: OrganismKey): string[] {
  switch (org) {
    case "CAF":
      return [
        "À l’attention du Service Recours Amiable",
        "Caisse d’Allocations Familiales",
      ]
    case "CPAM":
      return [
        "À l’attention du Service Prestations",
        "Caisse Primaire d’Assurance Maladie",
      ]
    case "POLE_EMPLOI":
      return [
        "À l’attention du Directeur d’Agence / Service Indemnisation",
        "Pôle Emploi",
      ]
  }
}

function tplCommonHeader(org: OrganismKey): string {
  const orgName = org === "POLE_EMPLOI" ? "Pôle Emploi" : org
  return `Madame, Monsieur,

Je vous écris concernant mon dossier auprès de ${orgName}.`
}

// === CAF ===
const TPL_CAF_TROP_PERCU = `
${tplCommonHeader("CAF")}

J’ai reçu le [[courrier/notification]] référencé(e) [[{{referenceNumber}}]] en date du [[{{decisionDate}}]], m’informant d’un **trop-perçu** d’un montant de [[{{amount}}]] €{{periodLine}}.

Motif indiqué : {{reasonGiven}}

**Ma situation réelle :**
{{yourExplanation}}

Au vu de ces éléments, je vous demande **{{desiredOutcomeText}}**. {{suspension}}
${BASE_SIGNOFF}
`

const TPL_CAF_NON_VERSEMENT = `
${tplCommonHeader("CAF")}

La prestation **{{benefit}}** n’a pas été versée, malgré la notification datée du [[{{decisionDate}}]] (réf. [[{{referenceNumber}}]]){{expectedAmountLine}}.

Motif indiqué : {{reasonGiven}}

**Ma situation réelle :**
{{yourExplanation}}

Je vous demande **la régularisation du paiement et le versement des éventuels arriérés**.
${BASE_SIGNOFF}
`

const TPL_CAF_REMISE_DETTE = `
${tplCommonHeader("CAF")}

Je sollicite une **remise de dette** d’un montant de [[{{amount}}]] € (réf. [[{{referenceNumber}}]], du [[{{decisionDate}}]]).

**Difficultés financières** :
{{financialHardship}}

Je demande : **{{remiseType}}**.
${BASE_SIGNOFF}
`

const TPL_CAF_MONTANT_ERREUR = `
${tplCommonHeader("CAF")}

Je constate une **erreur de calcul** sur ma prestation (réf. [[{{referenceNumber}}]], du [[{{decisionDate}}]]). L’écart relevé est de **[[{{amountDiff}}]] €**.

Motif indiqué : {{reasonGiven}}

**Ma situation réelle :**
{{yourExplanation}}

Je vous demande **correction et rattrapage des montants**.
${BASE_SIGNOFF}
`

// === CPAM ===
const TPL_CPAM_RETARD_REMBOURSEMENT = `
${tplCommonHeader("CPAM")}

Mes soins du [[{{careDate}}]] n’ont pas été remboursés à ce jour (réf. [[{{referenceNumber}}]], notification du [[{{decisionDate}}]]){{expectedAmountLine}}.

**Explications complémentaires** :
{{yourExplanation}}

Je vous demande **traitement rapide et remboursement**.
${BASE_SIGNOFF}
`

const TPL_CPAM_REFUS_REMBOURSEMENT = `
${tplCommonHeader("CPAM")}

Je conteste le **refus de remboursement** concernant {{actType}} (réf. [[{{referenceNumber}}]], du [[{{decisionDate}}]]).

Motif indiqué : {{reasonGiven}}

**Éléments utiles** :
{{yourExplanation}}

Je sollicite **réexamen motivé** et **prise en charge** si justifiée.
${BASE_SIGNOFF}
`

const TPL_CPAM_REFUS_ARRET_TRAVAIL = `
${tplCommonHeader("CPAM")}

Je conteste la **décision du médecin-conseil** refusant l’indemnisation de mon **arrêt de travail** (du [[{{workStopStart}}]] au {{workStopEnd}}) (réf. [[{{referenceNumber}}]], du [[{{decisionDate}}]]).

Motif indiqué : {{reasonGiven}}

**Éléments utiles** :
{{yourExplanation}}

Je sollicite **réexamen** et indemnisation si fondée.
${BASE_SIGNOFF}
`

const TPL_CPAM_FEUILLE_SOINS = `
${tplCommonHeader("CPAM")}

Je vous informe d’un **problème de remboursement** lié à une **feuille de soins papier** transmise (réf. [[{{referenceNumber}}]], du [[{{decisionDate}}]]).

**Éléments utiles** :
{{yourExplanation}}

Je vous demande **traitement et régularisation**. Je joins, le cas échéant, la **feuille de soins originale**.
${BASE_SIGNOFF}
`

// === Pôle Emploi ===
const TPL_PE_RADIATION = `
${tplCommonHeader("POLE_EMPLOI")}

Je **conteste la radiation** prononcée (réf. [[{{referenceNumber}}]], du [[{{decisionDate}}]]).

Motif indiqué : {{radiationReason}}

**Ma situation réelle :**
{{yourExplanation}}

Je demande **annulation de la décision** et **rétablissement de mes droits**.
${BASE_SIGNOFF}
`

const TPL_PE_OBSERVATIONS = `
${tplCommonHeader("POLE_EMPLOI")}

Suite à la **mise en demeure** du [[{{miseEnDemeureDate}}]] (réf. [[{{referenceNumber}}]]), voici mes **observations** :

{{observations}}

Je reste disponible pour tout complément.
${BASE_SIGNOFF}
`

const TPL_PE_TROP_PERCU = `
${tplCommonHeader("POLE_EMPLOI")}

Je conteste un **trop-perçu** d’un montant de [[{{amount}}]] € (réf. [[{{referenceNumber}}]], du [[{{decisionDate}}]]).

Motif indiqué : {{reasonGiven}}

**Ma situation réelle :**
{{yourExplanation}}

Je demande **{{desiredOutcomeText}}** et **suspension du recouvrement** durant l’étude.
${BASE_SIGNOFF}
`

const TPL_PE_REFUS_INDEMNISATION = `
${tplCommonHeader("POLE_EMPLOI")}

Je conteste le **refus d’indemnisation ARE** (réf. [[{{referenceNumber}}]], du [[{{decisionDate}}]]). Mon dernier contrat s’est terminé le [[{{lastEmploymentEnd}}]].

Motif indiqué : {{reasonGiven}}

**Éléments utiles :**
{{yourExplanation}}

Je demande **réexamen prioritaire** et **ouverture des droits** si fondée.
${BASE_SIGNOFF}
`

const TPL_PE_ATTESTATION_EMPLOYEUR = `
${tplCommonHeader("POLE_EMPLOI")}

Mon dossier est bloqué faute d’**attestation employeur** ({{employerName}}) (réf. [[{{referenceNumber}}]], du [[{{decisionDate}}]]).

**Relances effectuées** :
{{relances}}

Je sollicite **assistance** pour régulariser la situation.
${BASE_SIGNOFF}
`

const MAP: Record<CaseId, string> = {
  // CAF
  CAF_TROP_PERCU: TPL_CAF_TROP_PERCU,
  CAF_NON_VERSEMENT: TPL_CAF_NON_VERSEMENT,
  CAF_REMISE_DETTE: TPL_CAF_REMISE_DETTE,
  CAF_MONTANT_ERREUR: TPL_CAF_MONTANT_ERREUR,
  // CPAM
  CPAM_RETARD_REMBOURSEMENT: TPL_CPAM_RETARD_REMBOURSEMENT,
  CPAM_REFUS_REMBOURSEMENT: TPL_CPAM_REFUS_REMBOURSEMENT,
  CPAM_REFUS_ARRET_TRAVAIL: TPL_CPAM_REFUS_ARRET_TRAVAIL,
  CPAM_FEUILLE_SOINS: TPL_CPAM_FEUILLE_SOINS,
  // Pôle Emploi
  POLE_EMPLOI_RADIATION: TPL_PE_RADIATION,
  POLE_EMPLOI_OBSERVATIONS: TPL_PE_OBSERVATIONS,
  POLE_EMPLOI_TROP_PERCU: TPL_PE_TROP_PERCU,
  POLE_EMPLOI_REFUS_INDEMNISATION: TPL_PE_REFUS_INDEMNISATION,
  POLE_EMPLOI_ATTESTATION_EMPLOYEUR: TPL_PE_ATTESTATION_EMPLOYEUR,
}

export function buildDraftForCase(args: BuildArgs): { draft: string; destLines: string[] } {
  const tpl = MAP[args.caseId]
  const destLines = destForOrganism(args.organism)

  // petits helpers dynamiques
  const ctx = { ...args.context }

  // CAF_TROP_PERCU : période
  const period = typeof ctx["period"] === "string" && ctx["period"].trim() ? `, pour la période ${String(ctx["period"])}` : ""
  // outcome textes
  const desiredOutcome = String(ctx["desiredOutcome"] ?? "")
  const desiredOutcomeText =
    args.caseId === "CAF_TROP_PERCU" || args.caseId === "POLE_EMPLOI_TROP_PERCU"
      ? (desiredOutcome === "annulation"
          ? "l’annulation du trop-perçu"
          : desiredOutcome === "reexamen"
            ? "un réexamen de mon dossier"
            : "une remise gracieuse ou un échéancier")
      : desiredOutcome === "annulation"
        ? "l’annulation de la décision"
        : desiredOutcome === "reexamen"
          ? "un réexamen de ma situation"
          : desiredOutcome === "remboursement"
            ? "le remboursement / rétablissement de mes droits"
            : "la mesure demandée"

  // suspension (CAF/PE trop-perçu)
  const needsSusp =
    args.caseId === "CAF_TROP_PERCU" || args.caseId === "POLE_EMPLOI_TROP_PERCU"
  const suspension = needsSusp ? "Je sollicite la suspension du recouvrement pendant l’instruction." : ""

  const filled = renderTemplate(tpl, {
    ...ctx,
    periodLine: period,
    desiredOutcomeText,
    suspension,
    expectedAmountLine:
      typeof ctx["expectedAmount"] === "number" ? ` (montant attendu : [[${ctx["expectedAmount"]}]] €)` : "",
    workStopEnd: ctx["workStopEnd"] ? `[[${ctx["workStopEnd"]}]]` : "à ce jour",
  })

  return { draft: cleanupText(filled), destLines }
}
