"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

const Pricing = () => {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)

  const guarantees = [
    { icon: Shield, title: "Conformité garantie", description: "97% de taux de réussite" },
    { icon: Zap, title: "Résultat immédiat", description: "PDF prêt en 30 secondes" },
    { icon: Shield, title: "Satisfaction garantie", description: "Remboursé si non satisfait" },
  ]

  const socialProof = [
    '📞 Sarah, 32 ans: "890€ d\'APL récupérés en 15 jours !"',
    '⚡ Julien, 28 ans: "Radiation annulée, allocations reprises"',
    '💰 Michel, 45 ans: "CPAM a remboursé mes 650€ de soins"',
    '🎯 Marie, 36 ans: "Trop-perçu CAF contesté avec succès"',
  ]

  return (
    <section id="tarifs" className="py-12 sm:py-20 lg:py-24 relative overflow-hidden px-4">
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
          className="text-center mb-8 sm:mb-14"
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
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Votre courrier professionnel</h3>
              <p className="text-muted text-sm sm:text-base">Généré en 2 minutes • Juridiquement conforme</p>
            </div>

            {/* Prix */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-900 text-white mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold">7,90€</span>
              </div>
              <p className="text-xs sm:text-sm text-muted">Paiement unique • Aucun abonnement</p>
            </div>

            {/* Features clés */}
            <div className="mb-8 sm:mb-10">
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
            <div className="text-center mb-5 sm:mb-6">
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

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-10 sm:mt-14 mb-10 sm:mb-16 px-0 sm:px-4 max-w-5xl mx-auto"
        >
          {guarantees.map((guarantee) => {
            const Icon = guarantee.icon
            return (
              <div
                key={guarantee.title}
                className="glass-white border border-gray-200 rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-gray-900">{guarantee.title}</h3>
                <p className="text-muted text-sm sm:text-base">{guarantee.description}</p>
              </div>
            )
          })}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="glass-white border border-gray-200 rounded-2xl p-5 sm:p-8 mx-0 sm:mx-4 shadow-lg"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-5 sm:mb-8 text-gray-900">
            Ils ont récupéré leurs <span className="gradient-text">droits</span> grâce à nous :
          </h3>

          {/* Mobile: 3 avis + bouton */}
          <div className="sm:hidden">
            <div className="grid grid-cols-1 gap-3 max-w-4xl mx-auto" id="testimonials-list-mobile">
              {(showAllTestimonials ? socialProof : socialProof.slice(0, 3)).map((testimonial, index) => (
                <motion.div
                  key={testimonial}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.05 * index }}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <p className="text-gray-700 text-sm leading-snug">{testimonial}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-4">
              <button
                onClick={() => setShowAllTestimonials((v) => !v)}
                className="w-full text-sm px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition text-gray-700"
                aria-expanded={showAllTestimonials}
                aria-controls="testimonials-list-mobile"
              >
                {showAllTestimonials ? "Moins d'avis" : "Plus d'avis"}
              </button>
            </div>
          </div>

          {/* Desktop: tous les avis */}
          <div className="hidden sm:grid grid-cols-2 gap-4 max-w-4xl mx-auto">
            {socialProof.map((testimonial, index) => (
              <motion.div
                key={testimonial}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <p className="text-gray-700 text-base leading-snug">{testimonial}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-muted text-sm sm:text-base">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
              Plus de 1000+ courriers générés • Moyenne de 650€ récupérés par client
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
