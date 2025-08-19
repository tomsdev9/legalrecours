"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Brain, Target, Scale } from "lucide-react"

const Features = () => {

  const mainFeatures: { icon: React.ComponentType<{ className?: string }>; title: string; description: React.ReactNode }[] = [
    {
      icon: Brain,
      title: "IA + Méthode juridique",
      description: (
        <>
          Modèles structurés selon les procédures réelles (<span className="text-green-primary font-medium">CAF</span>, <span className="text-green-primary font-medium">CPAM</span>, <span className="text-green-primary font-medium">France Travail</span>) et les délais applicables.
        </>
      ),
    },
    {
      icon: Shield,
      title: "Conformité vérifiée",
      description: (
        <>
          Mentions requises, pièces, <span className="text-green-primary font-medium">base légale</span> et <span className="text-green-primary font-medium">délais</span> indiqués clairement sur chaque courrier.
        </>
      ),
    },
    {
      icon: Zap,
      title: "Résultat immédiat",
      description: (
        <>
          Fini les heures de recherche : votre <span className="text-green-primary font-medium">PDF professionnel</span> est prêt en <span className="text-green-primary font-medium">2 minutes</span>.
        </>
      ),
    },
    {
      icon: Target,
      title: "Adapté à votre cas",
      description: (
        <>
          Le contenu s&apos;ajuste à votre <span className="text-green-primary font-medium">situation exacte</span> pour maximiser vos chances.
        </>
      ),
    },
  ]



  return (
    <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden px-4">
      {/* Background - adapté fond blanc */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.02, rotate: 45 }}
          transition={{ duration: 3 }}
          className="absolute top-20 left-1/4 w-64 h-64 sm:w-96 sm:h-96 border border-gray-200 rounded-3xl"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.02, rotate: -45 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="absolute bottom-20 right-1/4 w-56 h-56 sm:w-80 sm:h-80 border border-gray-300 rounded-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            Pourquoi choisir <span className="gradient-text">LegalRecours</span> ?
          </h2>
          <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto px-4">
            La différence entre un courrier qui aboutit et un courrier qui s&apos;égare.
          </p>
        </motion.div>

        {/* Main features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-white rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border border-gray-100"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-secondary leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>



        {/* Bandeau preuve "sobre" */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 text-xs sm:text-sm text-muted">
          <Scale className="w-4 h-4" />
          <span>Indicateurs internes sur dossiers traités. Le résultat dépend de votre situation et des justificatifs fournis.</span>
        </div>
      </div>
    </section>
  )
}

export default Features