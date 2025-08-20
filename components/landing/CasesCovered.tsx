// components/landing/CasesCovered.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  Building2,
  Shield,
  Stethoscope,
  Briefcase,
  Clock,
  ArrowRight,
  FileText,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Types
type CaseItem = { id: string; label: string; hint?: string; comingSoon?: boolean }

const DATA: Record<
  string,
  { icon: React.ElementType; title: string; items: CaseItem[] }
> = {
  CAF: {
    icon: Shield,
    title: "CAF",
    items: [
      { id: "CAF_TROP_PERCU", label: "Trop-perçu", hint: "Remise, échelonnement, contestation" },
      { id: "CAF_NON_VERSEMENT", label: "Non-versement", hint: "APL, PA, prime activité…" },
      { id: "CAF_REMISE_DETTE", label: "Remise de dette entière ou partielle" },
      { id: "CAF_MONTANT_ERREUR", label: "Montant erroné", hint: "Erreur de calcul/ressources" },
    ],
  },
  CPAM: {
    icon: Stethoscope,
    title: "CPAM",
    items: [
      { id: "CPAM_RETARD_REMBOURSEMENT", label: "Retard de remboursement" },
      { id: "CPAM_REFUS_REMBOURSEMENT", label: "Refus de remboursement", hint: "Actes/soins, devis, ALD…" },
      { id: "CPAM_REFUS_ARRET_TRAVAIL", label: "Refus d’arrêt de travail" },
      { id: "CPAM_FEUILLE_SOINS", label: "Feuille de soins", hint: "Perdue / non traitée" },
    ],
  },
  FRANCE_TRAVAIL: {
    icon: Briefcase,
    title: "France Travail",
    items: [
      { id: "POLE_EMPLOI_RADIATION", label: "Annulation de radiation" },
      { id: "POLE_EMPLOI_OBSERVATIONS", label: "Observations/convocation" },
      { id: "POLE_EMPLOI_TROP_PERCU", label: "Trop-perçu", hint: "Plan de remboursement" },
      { id: "POLE_EMPLOI_REFUS_INDEMNISATION", label: "Refus d’indemnisation" },
      { id: "POLE_EMPLOI_ATTESTATION_EMPLOYEUR", label: "Attestation employeur" },
    ],
  },
}

// Étapes (ex-HowItWorks, sans CTA/prix)
const steps = [
  {
    id: 1,
    icon: Building2,
    title: "Choisissez votre organisme",
    description: "CAF, CPAM ou France Travail",
    details: "Sélectionnez l'organisme concerné par votre problème administratif.",
    color: "from-gray-700 to-gray-900",
  },
  {
    id: 2,
    icon: FileText,
    title: "Décrivez votre situation",
    description: "Quelques questions simples",
    details: "Nous identifions le bon motif juridique et les pièces utiles.",
    color: "from-gray-700 to-gray-900",
  },
  {
    id: 3,
    icon: Download,
    title: "Recevez votre courrier",
    description: "PDF professionnel en 30 secondes",
    details: "Document structuré, conforme et prêt à être envoyé en LRAR.",
    color: "from-gray-700 to-gray-900",
  },
]

function CasesCovered() {
  const tabs = Object.keys(DATA) as (keyof typeof DATA)[]
  const [active, setActive] = useState<keyof typeof DATA>("CAF")
  const ActiveIcon = DATA[active].icon

  // Remplissage à 6 cartes avec des placeholders génériques “Bientôt disponible”
  const baseItems = DATA[active].items
  const filledItems: CaseItem[] = [...baseItems]
  let idx = 0
  while (filledItems.length < 6) {
    filledItems.push({
      id: `SOON_${active}_${idx++}`,
      label: "Bientôt disponible",
      hint: "Bientôt disponible",
      comingSoon: true,
    })
  }

  return (
    <section id="cas-couverts" className="py-10 sm:py-14 lg:py-16 bg-white relative overflow-hidden">
      <div className="container-custom">
        {/* ====== Comment ça marche ? ====== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Comment <span className="gradient-text">ça marche</span> ?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            3 étapes simples pour transformer votre galère administrative en victoire juridique.
          </p>
        </motion.div>

        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
            {steps.map((step, index) => {
              const Icon = step.icon as React.ElementType
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group max-w-sm w-full mx-auto"
                >
                  <div className="glass-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 relative z-10 group-hover:scale-[1.01] h-full flex flex-col">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                        {step.id}
                      </div>
                    </div>

                    <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-green-primary font-medium mb-2 text-sm">{step.description}</p>
                    <p className="text-muted text-sm leading-relaxed">{step.details}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ====== Quels cas sont couverts ? ====== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
  Dans quels <span className="gradient-text">cas</span> pouvons-nous vous aider ?
</h2>

        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 justify-center">
          {tabs.map((k) => {
            const Icon = DATA[k].icon
            const isActive = k === active
            return (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={[
                  "inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm whitespace-nowrap transition-all",
                  isActive
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
                ].join(" ")}
                aria-pressed={isActive}
              >
                <Icon className="w-4 h-4" />
                {DATA[k].title}
              </button>
            )
          })}
        </div>

        {/* Active panel */}
        <div className="mt-6 sm:mt-8">
          <div className="flex items-center gap-2 justify-center mb-4 text-gray-800">
            <ActiveIcon className="w-5 h-5" />
            <span className="font-semibold">{DATA[active].title}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto"
            >
              {filledItems.map((it) => {
                const soon = it.comingSoon
                return (
                  <div
                    key={it.id}
                    className={[
                      "relative glass-white border rounded-xl p-4 flex items-start gap-3 transition-shadow",
                      soon
                        ? "border-gray-200/80 bg-white/60 text-gray-500"
                        : "border-gray-200 hover:shadow-md",
                    ].join(" ")}
                  >
                    <div className="mt-0.5">
                      {soon ? (
                        <Clock className="w-4 h-4 text-gray-500" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#34D28D]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className={["font-medium", soon ? "text-gray-600" : "text-gray-900"].join(" ")}>
                        {it.label}
                      </p>
                      {it.hint && (
                        <p className={["text-xs mt-0.5", soon ? "text-gray-500" : "text-gray-600"].join(" ")}>
                          {it.hint}
                        </p>
                      )}
                    </div>

                    {soon && (
                      <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-700">
                        Bientôt
                      </span>
                    )}
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* CTA principal + extra + infos */}
          <div className="text-center mt-6 sm:mt-8">
            <a
              href="/wizard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#222223] text-white hover:bg-black transition shadow-md"
            >
              <Building2 className="w-4 h-4" />
              Démarrer et choisir mon organisme
            </a>

            <div className="mt-3">
              <Button asChild variant="outline" className="group">
                <Link href="/wizard" className="inline-flex items-center gap-2">
                  Je commence maintenant
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>

            <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
              <span className="font-semibold text-gray-900">7,90€</span> seulement • <span className="text-green-600">Satisfait ou remboursé</span>
            </p>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
              Sans inscription • PDF immédiat • Paiement unique
            </p>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
              <span className="font-medium"></span>D’autres organismes arrivent très vite (URSSAF, Impôts, CROUS, MSA, assurances…)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CasesCovered
