"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Plus, Minus, Shield, Clock, FileText, CreditCard } from "lucide-react"

type FaqItem = { question: string; answer: string }
type Fact = { icon: React.ComponentType<{ className?: string }>; title: string; description: string }

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FaqItem[] = [
    {
      question: "J'ai déjà payé puis on m'a accordé une remise : puis-je être remboursé(e) ?",
      answer:
        "Oui. Si une remise de dette est accordée après paiement, vous pouvez demander le remboursement des sommes indûment versées. Nous générons le courrier adapté avec la référence de la remise et le RIB.",
    },
    {
      question: "On me réclame un trop-perçu plus d'un an après : est-ce normal ?",
      answer:
        "Certaines dettes sont prescrites ou mal calculées. Notre diagnostic vous indique si la décision est contestable et sur quel fondement (erreur de calcul, délai, absence de base légale…).",
    },
    {
      question: "Comment ça marche exactement ?",
      answer:
        "Vous choisissez l'organisme, répondez à quelques questions, et notre IA génère un courrier conforme (base légale, pièces, délais). Vous téléchargez le PDF immédiatement.",
    },
    {
      question: "Mes courriers sont-ils vraiment conformes ?",
      answer:
        "Chaque modèle suit la structure attendue par l'administration (identification, motif, texte applicable, pièces, demande) et mentionne les délais. Conformité RGPD et paiement sécurisé.",
    },
    {
      question: "Combien de temps pour recevoir mon courrier ?",
      answer: "Votre PDF est prêt en 30 secondes après paiement.",
    },
    {
      question: "Le paiement est-il sécurisé ?",
      answer:
        "Oui, via Stripe. Nous ne stockons pas vos données bancaires.",
    },
  ]

  const quickFacts: Fact[] = [
    { icon: Clock, title: "2 minutes", description: "Temps moyen de génération" },
    { icon: Shield, title: "Conformité", description: "Structure et mentions légales" },
    { icon: FileText, title: "PDF pro", description: "Prêt LRAR + pièces listées" },
    { icon: CreditCard, title: "Paiement unique", description: "Pas d'abonnement" },
  ]

  return (
    <section id="faq" className="py-9 sm:py-20 lg:py-24 relative overflow-hidden px-2.5 sm:px-4">
      {/* Background - adapté fond blanc */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.02, rotate: 180 }}
          transition={{ duration: 4 }}
          className="absolute top-1/3 left-1/3 w-44 h-44 sm:w-96 sm:h-96 border-2 border-gray-200 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.02, rotate: -180 }}
          transition={{ duration: 4, delay: 0.5 }}
          className="absolute bottom-1/3 right-1/3 w-40 h-40 sm:w-80 sm:h-80 border-2 border-gray-300 rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header - titre réduit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
          <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto px-4">
            Tout ce qu&apos;il faut savoir avant de commencer
          </p>
        </motion.div>

        {/* Quick facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-16"
        >
          {quickFacts.map((fact) => {
            const Icon = fact.icon
            return (
              <div key={fact.title} className="glass-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
                <Icon className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                <div className="text-lg font-semibold text-green-primary mb-1">{fact.title}</div>
                <div className="text-sm text-muted">{fact.description}</div>
              </div>
            )
          })}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              viewport={{ once: true }}
              className="glass-white border border-gray-200 rounded-xl mb-4 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left 
                           grid grid-cols-[1fr_auto] items-start gap-3 hover:bg-gray-50 transition-colors duration-200
                           sm:flex sm:items-center sm:justify-between"
              >
                {/* Titre : mobile petit + empêche l'icône de passer à la ligne */}
                <h3 className="min-w-0 !text-[14px] sm:!text-lg leading-tight font-semibold text-gray-900 pr-2 sm:pr-4">
                  {faq.question}
                </h3>

                {/* Icône toujours à droite (ne rétrécit pas) */}
                <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                  {openIndex === index ? 
                    <Minus className="w-5 h-5 text-gray-600" /> : 
                    <Plus className="w-5 h-5 text-gray-600" />
                  }
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed text-base">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-16"
        >
          <div className="glass-white border border-gray-200 rounded-xl p-6 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Besoin d&apos;un coup de main ?</h3>
            <p className="text-secondary mb-4 text-base">On vous répond rapidement par email.</p>
            <a 
              href="mailto:contact@legalrecours.fr" 
              className="text-gray-900 hover:text-gray-700 transition-colors font-medium text-base underline decoration-2 underline-offset-4"
            >
              contact@legalrecours.fr
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
