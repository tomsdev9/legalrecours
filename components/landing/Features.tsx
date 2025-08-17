"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Brain, Clock, CheckCircle, X, Target, Users } from "lucide-react"

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "IA Expert en Droit",
      description: "Notre IA connaît parfaitement le droit administratif français et les procédures de chaque organisme",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Conformité Garantie",
      description: "Références légales exactes, délais respectés, mentions obligatoires. Vos courriers ont 97% de taux de réussite",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Résultat Immédiat",
      description: "Fini les heures de recherche. Votre courrier professionnel est prêt en 2 minutes chrono",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Personnalisation Précise",
      description: "Chaque courrier est adapté à votre situation exacte, avec vos données et votre contexte spécifique",
      color: "from-orange-500 to-red-500"
    }
  ]

  const comparison = {
    us: [
      "Courrier juridiquement correct",
      "Références légales automatiques", 
      "Délais de recours calculés",
      "Adresses exactes des organismes",
      "Formulation professionnelle",
      "Résultat en 2 minutes",
      "Taux de réussite 97%",
      "Support si questions"
    ],
    others: [
      "Risque d'erreurs juridiques",
      "Recherche des textes de loi",
      "Calcul manuel des délais",
      "Recherche des bonnes adresses", 
      "Formulation approximative",
      "Plusieurs heures de travail",
      "Succès aléatoire",
      "Vous êtes seul(e)"
    ]
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.03, rotate: 45 }}
          transition={{ duration: 3 }}
          className="absolute top-20 left-1/4 w-64 h-64 sm:w-96 sm:h-96 border border-blue-500 rounded-3xl"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.03, rotate: -45 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="absolute bottom-20 right-1/4 w-56 h-56 sm:w-80 sm:h-80 border border-purple-500 rounded-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Pourquoi choisir <span className="gradient-text">LegalRecours</span> ?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            La différence entre un courrier qui fonctionne et un courrier qui traîne dans les bureaux
          </p>
        </motion.div>

        {/* Main features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-24">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Comparison section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 sm:p-8 md:p-12"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            <span className="gradient-text">LegalRecours</span> vs 
            <span className="text-gray-400"> Faire soi-même</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* LegalRecours column */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-green-400">Avec LegalRecours</h4>
              </div>
              
              {comparison.us.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200 text-sm sm:text-base">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Others column */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-red-400">Faire soi-même</h4>
              </div>
              
              {comparison.others.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">97%</div>
                <div className="text-gray-400 text-sm sm:text-base">Taux de réussite LegalRecours</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-2">23%</div>
                <div className="text-gray-400 text-sm sm:text-base">Taux de réussite &ldquo;fait maison&rdquo;</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">2 min</div>
                <div className="text-gray-400 text-sm sm:text-base">vs 4-6 heures en moyenne</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features