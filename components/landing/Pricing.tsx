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
    <section id="tarifs" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden px-4">
      {/* Background decorations - style Framer subtil */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-4 sm:right-20 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header - titre réduit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4 text-gray-900">
            Un prix <span className="gradient-text">transparent</span>
          </h2>
          <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto px-4">
            7,90€ pour un courrier qui peut vous faire récupérer des centaines d&apos;euros
          </p>
        </motion.div>

        {/* Main pricing card - NOUVEAU DESIGN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="px-4"
        >
          <div className="glass-white rounded-3xl p-8 sm:p-12 border border-gray-200 relative overflow-visible mt-8 shadow-lg max-w-xl mx-auto">
            
            {/* Header simple et élégant */}
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Votre courrier professionnel</h3>
              <p className="text-muted">Généré en 2 minutes • Juridiquement conforme</p>
            </div>

            {/* Prix central avec contexte */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-900 text-white mb-4">
                <span className="text-2xl font-bold">7,90€</span>
              </div>
              <p className="text-sm text-muted">Paiement unique • Aucun abonnement</p>
            </div>

            {/* Features clés - version compacte */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Conformité légale</p>
                <p className="text-xs text-muted">Références et délais inclus</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Résultat immédiat</p>
                <p className="text-xs text-muted">PDF prêt en 30 secondes</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">97% de réussite</p>
                <p className="text-xs text-muted">Taux de succès prouvé</p>
              </div>
            </div>

            {/* CTA principal */}
            <div className="text-center mb-6">
              <Button asChild className="group px-5 py-2 bg-[#222223] hover:bg-black text-white font-medium text-sm rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                <Link href="/wizard" className="flex items-center justify-center gap-2">
                  <span>Créer mon courrier</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Footer minimaliste */}
            <div className="text-center border-t border-gray-200 pt-6">
              <div className="flex items-center justify-center gap-6 text-xs text-muted">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>97% de réussite</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guarantees - style Framer clean */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 mb-12 sm:mb-16 px-4 max-w-5xl mx-auto"
        >
          {guarantees.map((guarantee) => {
            const Icon = guarantee.icon
            return (
              <div key={guarantee.title} className="glass-white border border-gray-200 rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900">{guarantee.title}</h3>
                <p className="text-muted text-sm sm:text-base">{guarantee.description}</p>
              </div>
            )
          })}
        </motion.div>

        {/* Social proof - style Framer épuré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="glass-white border border-gray-200 rounded-2xl p-6 sm:p-8 mx-4 shadow-lg"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
            Ils ont récupéré leurs <span className="gradient-text">droits</span> grâce à nous :
          </h3>

          {/* Mobile: 3 avis + bouton pour dérouler */}
          <div className="sm:hidden">
            <div className="grid grid-cols-1 gap-3 max-w-4xl mx-auto" id="testimonials-list-mobile">
              {(showAllTestimonials ? socialProof : socialProof.slice(0, 3)).map((testimonial, index) => (
                <motion.div
                  key={testimonial}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <p className="text-gray-700 text-sm">{testimonial}</p>
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

          {/* Desktop: tous les avis, pas de bouton */}
          <div className="hidden sm:grid grid-cols-2 gap-4 max-w-4xl mx-auto">
            {socialProof.map((testimonial, index) => (
              <motion.div
                key={testimonial}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <p className="text-gray-700 text-base">{testimonial}</p>
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