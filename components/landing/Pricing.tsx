"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Star, ArrowRight, Shield, Zap, FileText, Users } from "lucide-react"
import Link from "next/link"

const Pricing = () => {
  const included = [
    "Courrier juridiquement correct",
    "Références légales automatiques",
    "PDF professionnel immédiat",
    "Envoi par email sécurisé",
    "Adresses exactes des organismes",
    "Calcul automatique des délais",
    "Satisfaction garantie ou remboursé",
    "Support client si questions",
  ]

  const guarantees = [
    { icon: Shield, title: "Conformité garantie", description: "97% de taux de réussite" },
    { icon: Zap, title: "Résultat immédiat", description: "PDF prêt en 30 secondes" },
    { icon: FileText, title: "Satisfaction garantie", description: "Remboursé si non satisfait" },
  ]

  const socialProof = [
    "📞 Sarah, 32 ans: \"890€ d'APL récupérés en 15 jours !\"",
    "⚡ Julien, 28 ans: \"Radiation annulée, allocations reprises\"",
    "💰 Michel, 45 ans: \"CPAM a remboursé mes 650€ de soins\"",
    "🎯 Marie, 36 ans: \"Trop-perçu CAF contesté avec succès\"",
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-4 sm:right-20 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
            Un prix <span className="gradient-text">transparent</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            7,90€ pour un courrier qui peut vous faire récupérer des centaines d&apos;euros
          </p>
        </motion.div>

        {/* Main pricing card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-lg sm:max-w-2xl mx-auto px-4"
        >
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-blue-500/30 relative overflow-visible mt-12">
            {/* Highlight badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg">
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                Recommandé
              </div>
            </div>

            {/* Price */}
            <div className="text-center mb-6 sm:mb-8 pt-6 sm:pt-8">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold gradient-text mb-3 sm:mb-4">
                7,90€
              </div>
              <div className="text-lg sm:text-xl text-gray-300 mb-2">Par document généré</div>
              <div className="text-xs sm:text-sm text-gray-400 px-4">
                Paiement unique • Pas d&apos;abonnement • Pas de frais cachés
              </div>
            </div>

            {/* What's included */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">
                Ce qui est inclus :
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 max-w-[760px] mx-auto justify-items-center items-start">
                {included.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex flex-nowrap items-center gap-3 justify-start w-[320px] max-w-full"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                    <span className="text-gray-200 text-sm sm:text-base text-left">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button size="lg" className="w-full sm:w-auto group mb-4">
                <Link href="/wizard" className="flex items-center justify-center gap-2">
                  <span className="text-sm sm:text-base">Générer mon courrier maintenant</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-xs sm:text-sm text-gray-400 px-4">
                💳 Paiement sécurisé par Stripe • 🔒 Données protégées • ⚡ Résultat immédiat
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Guarantees */}
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
              <div key={guarantee.title} className="glass rounded-2xl p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">{guarantee.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{guarantee.description}</p>
              </div>
            )
          })}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 sm:p-8 mx-4"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8">
            Ils ont récupéré leurs <span className="gradient-text">droits</span> grâce à nous :
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {socialProof.map((testimonial, index) => (
              <motion.div
                key={testimonial}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10"
              >
                <p className="text-gray-200 text-sm sm:text-base">{testimonial}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-gray-400 text-sm sm:text-base">
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
