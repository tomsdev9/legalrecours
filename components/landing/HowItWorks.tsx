"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, FileText, Download, CheckCircle, Mail, CalendarClock, Repeat2 } from "lucide-react"
import Link from "next/link"

const HowItWorks = () => {
  const steps: { id: number; icon: React.ComponentType<{ className?: string }>; title: string; description: string; details: string; color: string }[] = [
    {
      id: 1,
      icon: Building2,
      title: "Choisissez votre organisme",
      description: "CAF, CPAM ou France Travail",
      details: "Sélectionnez l'organisme concerné par votre problème administratif.",
      color: "from-gray-700 to-gray-900", // Noir/gris foncé
    },
    {
      id: 2,
      icon: FileText,
      title: "Décrivez votre situation",
      description: "Quelques questions simples",
      details: "Nous identifions le bon motif juridique et les pièces utiles.",
      color: "from-gray-700 to-gray-900", // Noir/gris foncé
    },
    {
      id: 3,
      icon: Download,
      title: "Recevez votre courrier",
      description: "PDF professionnel en 30 secondes",
      details: "Document structuré, conforme et prêt à être envoyé en LRAR.",
      color: "from-gray-700 to-gray-900", // Noir/gris foncé
    },
  ]

  const benefits: string[] = ["Références légales", "Délais respectés", "Formulation précise", "Adresses exactes"]

  const journey: { icon: React.ComponentType<{ className?: string }>; title: string; note: string }[] = [
    { icon: CheckCircle, title: "Diagnostic rapide", note: "Vérification de la contestabilité de la décision." },
    { icon: Mail, title: "Envoi recommandé", note: "Conseils pour LRAR + pièces à joindre." },
    { icon: CalendarClock, title: "Suivi des délais", note: "Rappels des dates clés (silence, relance, contentieux)." },
    { icon: Repeat2, title: "Relance / Réexamen", note: "Modèles fournis si pas de réponse ou refus." },
  ]

  return (
    <section id="comment-ca-marche" className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      {/* Background - adapté fond blanc */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-gray-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gray-400 rounded-full blur-3xl"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Comment <span className="gradient-text">ça marche</span> ?
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            3 étapes simples pour transformer votre galère administrative en victoire juridique.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 sm:mb-16 justify-items-center">
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
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0" />
                )}

                <div className="glass-white border border-gray-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 relative z-10 group-hover:scale-105 h-full flex flex-col min-h-[340px]">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                      {step.id}
                    </div>
                  </div>

                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-green-primary font-medium mb-4">{step.description}</p>
                    <p className="text-muted text-sm leading-relaxed">{step.details}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Pourquoi ça marche */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-white border border-gray-100 rounded-2xl p-8 mb-12 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
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
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 p-[1px] border border-gray-200"
              >
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-sm md:text-base text-gray-700 whitespace-nowrap">{benefit}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline "jusqu'au bout" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">On vous guide <span className="gradient-text">jusqu&apos;au bout</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {journey.map((j) => {
              const Icon = j.icon
              return (
                <div key={j.title} className="glass-white border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{j.title}</p>
                    <p className="text-sm text-muted">{j.note}</p>
                  </div>
                </div>
              )
            })}
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
          <Button asChild className="group px-6 py-3 bg-[#222223] hover:bg-black text-white font-medium rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
            <Link href="/wizard" className="inline-flex items-center gap-2 flex-nowrap whitespace-nowrap max-w-full min-w-0">
              <span className="truncate leading-none">Je commence maintenant</span>
              <ArrowRight className="w-5 h-5 shrink-0 self-center transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <p className="text-sm text-muted mt-4">
            <span className="font-semibold text-gray-900">7,90€</span> seulement • <span className="text-green-600 ml-2">Satisfait ou remboursé</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks