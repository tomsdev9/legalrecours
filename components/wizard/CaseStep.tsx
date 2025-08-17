"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import useWizard from "@/hooks/useWizard"
import {
  getCasesByOrganism,
  type CaseData,
  type CaseId,
} from "@/lib/wizard-data"
import {
  FileText,
  AlertTriangle,
  Receipt,
  Clock,
  CheckCircle,
  Ban,
  HelpCircle,
  Wallet,
  ClipboardList,
  Heart,
  Briefcase,
  Building2,
} from "lucide-react"

// Type de composant Lucide (icône)
type IconComp = React.ComponentType<React.ComponentProps<"svg">>

// Icônes par CASE (optionnel, on met un fallback après)
const iconByCase: Partial<Record<CaseId, IconComp>> = {
  // CAF
  CAF_TROP_PERCU: Wallet,
  CAF_NON_VERSEMENT: Receipt,
  CAF_REMISE_DETTE: ClipboardList,
  CAF_MONTANT_ERREUR: AlertTriangle,

  // CPAM
  CPAM_RETARD_REMBOURSEMENT: Clock,
  CPAM_REFUS_REMBOURSEMENT: Ban,
  CPAM_REFUS_ARRET_TRAVAIL: Ban,
  CPAM_FEUILLE_SOINS: Receipt,

  // Pôle Emploi
  POLE_EMPLOI_RADIATION: Ban,
  POLE_EMPLOI_OBSERVATIONS: ClipboardList,
  POLE_EMPLOI_TROP_PERCU: Wallet,
  POLE_EMPLOI_REFUS_INDEMNISATION: AlertTriangle,
  POLE_EMPLOI_ATTESTATION_EMPLOYEUR: FileText,
}

// Fallback par organisme si pas d’icône spécifique au case
const iconByOrganismFallback: Record<"CAF" | "CPAM" | "POLE_EMPLOI", IconComp> = {
  CAF: Building2,
  CPAM: Heart,
  POLE_EMPLOI: Briefcase,
}

// Fallback générique
const DefaultIcon: IconComp = FileText

const CaseStep: React.FC = () => {
  const { state, selectCase } = useWizard()

  // Garde-fou : si on n’a pas d’organisme (accès direct à /step-2)
  const organism = state.selectedOrganism
  const cases: CaseData[] = useMemo(
    () => getCasesByOrganism(organism),
    [organism]
  )

  if (!organism) {
    return (
      <div className="text-center text-gray-300">
        Veuillez d’abord sélectionner un organisme à l’étape précédente.
      </div>
    )
  }

  if (!cases || cases.length === 0) {
    return (
      <div className="text-center text-gray-300">
        Aucun cas disponible pour cet organisme pour le moment.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cases.map((c, idx) => {
        const isSelected = state.selectedCase === c.id
        // Choix de l’icône : spécifique au CaseId → fallback organisme → fallback générique
        const Icon =
          iconByCase[c.id] ??
          iconByOrganismFallback[organism] ??
          DefaultIcon

        return (
          <motion.button
            type="button"
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 * idx }}
            onClick={() => selectCase(c.id)}
            className={[
              "text-left rounded-2xl p-5 border-2 transition-all duration-300 group",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
              isSelected
                ? "border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
            ].join(" ")}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p
                  className={[
                    "font-semibold",
                    isSelected ? "text-white" : "text-gray-100",
                  ].join(" ")}
                >
                  {c.title}
                </p>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {c.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Cliquez pour sélectionner
              </span>
              {isSelected ? (
                <span className="inline-flex items-center gap-1 text-xs text-green-400 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Sélectionné
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <HelpCircle className="w-4 h-4" />
                  Plus d’infos dans l’étape suivante
                </span>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

export default CaseStep
