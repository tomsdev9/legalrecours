"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, FileText, Download, CheckCircle } from "lucide-react"
import Link from "next/link"

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: Building2,
      title: "Choisissez votre organisme",
      description: "CAF, CPAM ou Pôle Emploi",
      details: "Sélectionnez l'organisme concerné par votre problème administratif",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: FileText,
      title: "Décrivez votre situation",
      description: "Quelques questions simples",
      details: "Notre assistant vous guide pour comprendre votre cas précis",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      icon: Download,
      title: "Recevez votre courrier",
      description: "PDF professionnel en 30 secondes",
      details: "Document juridiquement correct, prêt à envoyer",
      color: "from-green-500 to-emerald-500"
    }
  ]

  // libellés courts pour tenir sur une seule ligne (MacBook Air)
  const benefits = [
    "Références légales",
    "Délais respectés",
    "Formulation précise",
    "Adresses exactes"
  ]

  return (
    <section id="comment-ca-marche" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Comment <span className="gradient-text">ça marche</span> ?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            3 étapes simples pour transformer votre galère administrative en victoire juridique
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 justify-items-center">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group max-w-sm w-full mx-auto"
              >
                {/* Connection line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
                )}

                {/* Card */}
                <div className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 relative z-10 group-hover:scale-105 h-full flex flex-col min-h-[340px]">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-blue-200 font-medium mb-4">{step.description}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.details}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Benefits — pills comme dans le Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-12 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Pourquoi nos courriers <span className="gradient-text">fonctionnent</span> ?
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 p-[1px]"
              >
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 glass">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-sm md:text-base text-gray-200 whitespace-nowrap">{benefit}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="xl" className="group px-6">
            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 flex-nowrap whitespace-nowrap max-w-full min-w-0"
            >
              <span className="truncate leading-none">Commencer maintenant</span>
              <ArrowRight className="w-5 h-5 shrink-0 self-center transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <p className="text-sm text-gray-400 mt-4">
            <span className="font-semibold text-white">7,90€</span> seulement •
            <span className="text-green-400 ml-2">Satisfaction garantie</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
