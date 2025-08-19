// /components/wizard/OrganismStep.tsx
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

  // Debug léger (retire si inutile)
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("🔍 selectedOrganism:", state.selectedOrganism)
  }, [state.selectedOrganism])

  const organisms = [
    {
      type: "CAF" as OrganismType,
      data: ORGANISMS.CAF,
      color: "from-gray-700 to-gray-900",
      stats: "650€ en moyenne récupérés",
      examples: ["APL non versée", "Trop-perçu contesté", "RSA suspendu", "Prime d'activité"],
    },
    {
      type: "CPAM" as OrganismType,
      data: ORGANISMS.CPAM,
      color: "from-gray-700 to-gray-900",
      stats: "450€ en moyenne récupérés",
      examples: ["Soins refusés", "Retard remboursement", "Arrêt de travail", "Transport sanitaire"],
    },
    {
      type: "POLE_EMPLOI" as OrganismType,
      data: ORGANISMS.POLE_EMPLOI,
      color: "from-gray-700 to-gray-900",
      stats: "1200€ en moyenne récupérés",
      examples: ["Radiation injuste", "Allocations coupées", "Trop-perçu ARE", "Attestation manquante"],
    },
  ] as const

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
          Choisissez l&apos;organisme administratif concerné. Notre IA connaît les procédures
          spécifiques de chacun.
        </p>
      </motion.div>

      {/* Grid */}
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
              onClick={() => selectOrganism(organism.type)}
              aria-pressed={isSelected}
              className={[
                "relative overflow-visible", // ✅ évite que le badge soit rogné
                "p-6 rounded-xl border-2 transition-all duration-300 group text-left",
                "glass-white hover:shadow-lg",
                isSelected
                  ? "border-green-primary shadow-lg shadow-green-500/20"
                  : "border-gray-200 hover:border-gray-300",
              ].join(" ")}
            >
              {/* Badge sélection */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-2 right-2 z-20 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
              )}

              {/* Contenu au-dessus du gradient */}
              <div className="relative z-10">
                {/* Logo */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-white flex items-center justify-center shadow-sm overflow-hidden border border-gray-100">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={80}
                    height={80}
                    className="object-contain p-2"
                    priority
                  />
                </div>

                {/* Texte */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-primary transition-colors">
                    {organism.data.shortName}
                  </h3>

                  <p className="text-secondary text-sm mb-4 leading-relaxed">
                    {organism.data.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Euro className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium text-sm">{organism.stats}</span>
                  </div>

                  {/* Examples */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted font-medium">Problèmes courants :</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {organism.examples.slice(0, 2).map((example) => (
                        <span
                          key={example}
                          className="text-xs px-2 py-1 bg-gray-100 rounded-full text-muted border border-gray-200"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient de survol (sous le contenu) */}
              <div
                className={[
                  "absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-5",
                  "transition-opacity duration-300 pointer-events-none z-0",
                  organism.color,
                ].join(" ")}
              />
            </motion.button>
          )
        })}
      </div>

      {/* Why it works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            ✅ Pourquoi nos courriers fonctionnent
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-secondary text-sm">Procédures officielles respectées</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <span className="text-secondary text-sm">97% de taux de réussite</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-secondary text-sm">1000+ clients satisfaits</span>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted">
            Service privé, non affilié ni agréé par la CAF, la CPAM ou France Travail.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default OrganismStep