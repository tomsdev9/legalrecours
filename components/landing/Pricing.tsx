"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

const Pricing = () => {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)


  const socialProof = [
    '📞 Sarah, 32 ans: "890€ d\'APL récupérés en 15 jours !"',
    '⚡ Julien, 28 ans: "Radiation annulée, allocations reprises"',
    '💰 Michel, 45 ans: "CPAM a remboursé mes 650€ de soins"',
    '🎯 Marie, 36 ans: "Trop-perçu CAF contesté avec succès"',
  ]

  return (
    <section id="tarifs" className="py-8 sm:py-16 lg:py-20 relative overflow-hidden px-4">
      {/* Background decorations - cachés sur mobile */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-20 w-56 h-56 md:w-72 md:h-72 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-20 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-5 px-2 text-gray-900">
            Un prix <span className="gradient-text">transparent</span>
          </h2>
          <p className="text-base sm:text-xl text-secondary max-w-3xl mx-auto px-2">
            7,90€ pour un courrier qui peut vous faire récupérer des centaines d&apos;euros
          </p>
        </motion.div>

        {/* Main pricing card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="px-0 sm:px-4"
        >
          <div className="glass-white rounded-3xl p-6 sm:p-10 border border-gray-200 relative overflow-visible shadow-lg max-w-2xl sm:max-w-xl mx-auto w-full">
            {/* Header simple */}
                    <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Votre courrier professionnel</h3>
              <p className="text-muted text-sm sm:text-base">Généré en 2 minutes • Juridiquement conforme</p>
            </div>

            {/* Prix */}
                    <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-900 text-white mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold">7,90€</span>
              </div>
              <p className="text-xs sm:text-sm text-muted">Paiement unique • Aucun abonnement</p>
            </div>

            {/* Features clés */}
            <div className="mb-6 sm:mb-8">
              {/* Mobile: list items horizontaux / Desktop: 3 colonnes centrées */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Item */}
                <div className="flex items-center gap-3 sm:block sm:text-center">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 mx-0 sm:mx-auto mb-0 sm:mb-3">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </div>
                  <div className="sm:px-0">
                    <p className="text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1 leading-snug">Conformité légale</p>
                    <p className="text-xs text-muted leading-snug">Références et délais inclus</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:block sm:text-center">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 mx-0 sm:mx-auto mb-0 sm:mb-3">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1 leading-snug">Résultat immédiat</p>
                    <p className="text-xs text-muted leading-snug">PDF prêt en 30 secondes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:block sm:text-center">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 mx-0 sm:mx-auto mb-0 sm:mb-3">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1 leading-snug">97% de réussite</p>
                    <p className="text-xs text-muted leading-snug">Taux de succès prouvé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA principal */}
            <div className="text-center mb-4 sm:mb-5">
              <Button
                asChild
                className="group w-full sm:w-auto px-5 py-3 sm:py-2 bg-[#222223] hover:bg-black text-white font-medium text-sm rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Link href="/wizard" className="flex items-center justify-center gap-2">
                  <span>Créer mon courrier</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Footer minimaliste */}
            <div className="text-center border-t border-gray-200 pt-5 sm:pt-6">
              <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs text-muted">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>97% de réussite</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
