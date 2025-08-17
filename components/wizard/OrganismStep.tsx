"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import useWizard from "@/hooks/useWizard"
import { ORGANISMS } from "@/lib/wizard-data"
import { OrganismType } from "@/types/wizard"
import { CheckCircle, Euro, Users, TrendingUp } from "lucide-react"

const LOGOS: Record<OrganismType, { src: string; alt: string }> = {
  CAF: { src: "/caf.png", alt: "CAF — service privé, non affilié" },
  CPAM: { src: "/cpam.png", alt: "CPAM — service privé, non affilié" },
  POLE_EMPLOI: { src: "/francetravail.png", alt: "France Travail — service privé, non affilié" },
}

const OrganismStep = () => {
  const { state, selectOrganism } = useWizard()

  // Debug léger (tu peux enlever)
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("🔍 selectedOrganism:", state.selectedOrganism)
  }, [state.selectedOrganism])

  const organisms = [
    {
      type: "CAF" as OrganismType,
      data: ORGANISMS.CAF,
      color: "from-blue-500 to-cyan-500",
      stats: "650€ en moyenne récupérés",
      examples: ["APL non versée", "Trop-perçu contesté", "RSA suspendu", "Prime d'activité"],
    },
    {
      type: "CPAM" as OrganismType,
      data: ORGANISMS.CPAM,
      color: "from-green-500 to-emerald-500",
      stats: "450€ en moyenne récupérés",
      examples: ["Soins refusés", "Retard remboursement", "Arrêt de travail", "Transport sanitaire"],
    },
    {
      type: "POLE_EMPLOI" as OrganismType,
      data: ORGANISMS.POLE_EMPLOI,
      color: "from-purple-500 to-pink-500",
      stats: "1200€ en moyenne récupérés",
      examples: ["Radiation injuste", "Allocations coupées", "Trop-perçu ARE", "Attestation manquante"],
    },
  ] as const

  const handleOrganismSelect = (organismType: OrganismType) => {
    selectOrganism(organismType)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
          Choisissez l&apos;organisme administratif concerné. Notre IA connaît les procédures
          spécifiques de chacun.
        </p>
      </motion.div>

      {/* Organisms grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {organisms.map((organism, index) => {
          const isSelected = state.selectedOrganism === organism.type
          const logo = LOGOS[organism.type]

          return (
            <motion.button
              key={organism.type}
              type="button"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOrganismSelect(organism.type)}
              className={[
                "relative p-6 rounded-2xl border-2 transition-all duration-300 group text-left",
                "bg-white/5 hover:bg-white/10",
                isSelected
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/20"
                  : "border-white/10 hover:border-white/20",
              ].join(" ")}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
              )}

              {/* Logo box */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-white/95 dark:bg-white flex items-center justify-center shadow-sm overflow-hidden">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className="object-contain p-2"
                  priority
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {organism.data.shortName}
                </h3>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {organism.data.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Euro className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium text-sm">{organism.stats}</span>
                </div>

                {/* Examples */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 font-medium">Problèmes courants :</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {organism.examples.slice(0, 2).map((example) => (
                      <span
                        key={example}
                        className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtle hover gradient */}
              <div
                className={[
                  "absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-5",
                  organism.color,
                  "transition-opacity duration-300 pointer-events-none",
                ].join(" ")}
              />
            </motion.button>
          )
        })}
      </div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            ✅ Pourquoi nos courriers fonctionnent
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 text-sm">Procédures officielles respectées</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300 text-sm">97% de taux de réussite</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300 text-sm">1000+ clients satisfaits</span>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-gray-400">
            Service privé, non affilié ni agréé par la CAF, la CPAM ou France Travail.
          </p>
        </div>
      </motion.div>

      {/* Selected organism info */}
      {state.selectedOrganism && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-xl p-6 border border-blue-500/30">
            <h4 className="text-white font-semibold mb-3">Organisme sélectionné :</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={LOGOS[state.selectedOrganism].src}
                  alt={LOGOS[state.selectedOrganism].alt}
                  width={44}
                  height={44}
                  className="object-contain p-1.5"
                />
              </div>
              <div>
                <p className="text-white font-medium">
                  {ORGANISMS[state.selectedOrganism].name}
                </p>
                <p className="text-gray-400 text-sm">
                  {ORGANISMS[state.selectedOrganism].description}
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm text-center">
                ✓ Prêt pour l&apos;étape suivante — décrivez votre problème
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default OrganismStep
