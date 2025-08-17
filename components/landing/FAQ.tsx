"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Plus, Minus, Shield, Clock, FileText, CreditCard } from "lucide-react"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Comment ça marche exactement ?",
      answer: "C'est très simple : vous choisissez votre organisme (CAF, CPAM, Pôle Emploi), vous décrivez votre situation en quelques clics, et notre IA génère immédiatement un courrier juridiquement correct. Vous recevez le PDF par email en moins de 2 minutes."
    },
    {
      question: "Mes courriers sont-ils vraiment conformes juridiquement ?",
      answer: "Absolument ! Notre IA est entraînée sur le droit administratif français. Chaque courrier inclut les références légales exactes, respecte les délais de recours et utilise la formulation juridique appropriée. Nous avons 97% de taux de réussite."
    },
    {
      question: "Que se passe-t-il si mon courrier ne fonctionne pas ?",
      answer: "Si votre courrier n'obtient pas de réponse favorable ou contient une erreur de notre part, nous vous remboursons intégralement. De plus, nous vous aidons à comprendre pourquoi et vous conseillons sur les prochaines étapes."
    },
    {
      question: "Combien de temps pour recevoir mon courrier ?",
      answer: "Votre courrier est généré instantanément après le paiement, généralement en moins de 30 secondes. Vous le recevez par email au format PDF, prêt à imprimer et envoyer."
    },
    {
      question: "Puis-je utiliser le service pour n'importe quel organisme ?",
      answer: "Actuellement, nous couvrons les 3 organismes les plus demandés : CAF, CPAM et Pôle Emploi. Nous travaillons sur l'ajout d'autres organismes (impôts, préfecture, URSSAF) selon les demandes de nos clients."
    },
    {
      question: "Le paiement est-il sécurisé ?",
      answer: "Oui, totalement ! Nous utilisons Stripe, le leader mondial du paiement en ligne, utilisé par des millions d'entreprises. Vos données bancaires ne transitent jamais par nos serveurs."
    },
    {
      question: "Gardez-vous mes données personnelles ?",
      answer: "Nous ne stockons que le minimum nécessaire (email + courrier généré) pendant 1 an pour vous permettre de le retélécharger. Aucune donnée n'est partagée avec des tiers. Conformité RGPD garantie."
    },
    {
      question: "Puis-je modifier le courrier généré ?",
      answer: "Le courrier est optimisé pour votre situation, mais vous pouvez bien sûr le modifier avant envoi. Cependant, nous recommandons de garder la structure et les références légales pour maximiser vos chances de succès."
    },
    {
      question: "Que faire après avoir envoyé le courrier ?",
      answer: "Envoyez votre courrier en recommandé avec accusé de réception. L'organisme a légalement 15 jours à 2 mois pour répondre selon le cas. Nous incluons ces délais dans chaque courrier généré."
    },
    {
      question: "Pourquoi payer 7,90€ au lieu d'utiliser ChatGPT gratuit ?",
      answer: "ChatGPT ne connaît pas les procédures administratives françaises spécifiques, ni les délais légaux exacts, ni les bonnes adresses. Nos courriers incluent tout cela automatiquement + 97% de taux de réussite vs ~20% pour un courrier générique."
    }
  ]

  const quickFacts = [
    {
      icon: Clock,
      title: "2 minutes",
      description: "Temps moyen de génération"
    },
    {
      icon: Shield,
      title: "97% de réussite",
      description: "Taux de courriers acceptés"
    },
    {
      icon: FileText,
      title: "1000+ courriers",
      description: "Déjà générés avec succès"
    },
    {
      icon: CreditCard,
      title: "Paiement unique",
      description: "Pas d'abonnement caché"
    }
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.03, rotate: 180 }}
          transition={{ duration: 4 }}
          className="absolute top-1/3 left-1/3 w-64 h-64 sm:w-96 sm:h-96 border-2 border-purple-500 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.03, rotate: -180 }}
          transition={{ duration: 4, delay: 0.5 }}
          className="absolute bottom-1/3 right-1/3 w-56 h-56 sm:w-80 sm:h-80 border-2 border-blue-500 rounded-full"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Tout ce que vous devez savoir sur LegalRecours
          </p>
        </motion.div>

        {/* Quick facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {quickFacts.map((fact, index) => {
            const Icon = fact.icon
            return (
              <div key={fact.title} className="glass rounded-xl p-3 sm:p-4 text-center">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-blue-400" />
                <div className="text-sm sm:text-lg font-bold gradient-text mb-1">{fact.title}</div>
                <div className="text-xs text-gray-400">{fact.description}</div>
              </div>
            )
          })}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass rounded-2xl mb-3 sm:mb-4 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  )}
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                  <div className="border-t border-white/10 pt-3 sm:pt-4">
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>
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
          className="text-center mt-12 sm:mt-16"
        >
          <div className="glass rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
              Une autre question ?
            </h3>
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Notre équipe vous répond en moins de 2h par email
            </p>
            <a 
              href="mailto:contact@legalrecours.fr"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm sm:text-base"
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