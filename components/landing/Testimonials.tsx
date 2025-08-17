"use client"

import { motion } from "framer-motion"
import { Star, Quote, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      age: "32 ans, mère célibataire",
      problem: "Trop-perçu CAF de 1200€",
      result: "890€ récupérés en 15 jours",
      quote: "J'étais paniquée quand j'ai reçu le courrier de la CAF. Avec LegalRecours, j'ai pu contester et prouver que l'erreur venait d'eux. Un poids énorme en moins !",
      rating: 5,
      timeAgo: "Il y a 2 semaines"
    },
    {
      name: "Julien R.",
      age: "28 ans, auto-entrepreneur", 
      problem: "Radiation Pôle emploi injustifiée",
      result: "Réintégration + allocations reprises",
      quote: "Radié pour une absence que j'avais pourtant signalée. Le courrier de LegalRecours était parfait, avec toutes les références légales. Réintégré en 10 jours !",
      rating: 5,
      timeAgo: "Il y a 1 mois"
    },
    {
      name: "Michel P.",
      age: "45 ans, commercial",
      problem: "CPAM refus remboursement",
      result: "650€ de soins remboursés",
      quote: "La CPAM refusait mes séances de kiné. Grâce au courrier généré, ils ont reconnu leur erreur et tout remboursé avec les intérêts de retard.",
      rating: 5,
      timeAgo: "Il y a 3 semaines"
    },
    {
      name: "Marie L.",
      age: "36 ans, infirmière",
      problem: "APL non versée depuis 3 mois",
      result: "2100€ d'arriérés récupérés",
      quote: "3 mois sans APL à cause d'un bug informatique. Leurs services n'arrivaient pas à débloquer. Une lettre de réclamation et tout s'est débloqué en 1 semaine.",
      rating: 5,
      timeAgo: "Il y a 1 semaine"
    },
    {
      name: "Thomas D.",
      age: "24 ans, étudiant",
      problem: "Bourse CROUS suspendue",
      result: "Bourse rétablie + rattrapage",
      quote: "Ma bourse était suspendue pour des documents soi-disant manquants. Le courrier a prouvé que j'avais tout envoyé. Merci LegalRecours !",
      rating: 5,
      timeAgo: "Il y a 2 mois"
    },
    {
      name: "Céline B.",
      age: "41 ans, divorcée",
      problem: "Prime d'activité calculée à tort",
      result: "450€ de rattrapage obtenu",
      quote: "Le calcul de ma prime d'activité était faux depuis 6 mois. Ils m'ont remboursé tout l'arriéré plus les excuses pour l'erreur.",
      rating: 5,
      timeAgo: "Il y a 3 semaines"
    }
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 0.05, y: 0 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-4 sm:left-10 w-60 h-60 sm:w-80 sm:h-80 bg-yellow-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 0.05, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 right-4 sm:right-10 w-72 h-72 sm:w-96 sm:h-96 bg-green-500 rounded-full blur-3xl"
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
            Ils ont récupéré leurs <span className="gradient-text">droits</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Plus de 1000 courriers générés, des milliers d&apos;euros récupérés
          </p>
          
          {/* Overall rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-6 sm:mt-8 glass rounded-full px-4 sm:px-6 py-2 sm:py-3 w-fit mx-auto"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white font-semibold ml-2 text-sm sm:text-base">4.9/5</span>
            <span className="text-gray-400 text-xs sm:text-sm">(1,247 avis)</span>
          </motion.div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 group relative"
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mb-3 sm:mb-4 opacity-50" />
              
              {/* Quote */}
              <p className="text-gray-200 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Author info */}
              <div className="border-t border-white/10 pt-3 sm:pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-xs text-gray-400">{testimonial.age}</p>
                  </div>
                  <span className="text-xs text-gray-500">{testimonial.timeAgo}</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-red-300">
                    <span className="font-medium">Problème:</span> {testimonial.problem}
                  </p>
                  <p className="text-xs text-green-300">
                    <span className="font-medium">Résultat:</span> {testimonial.result}
                  </p>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center glass rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            Rejoignez les <span className="gradient-text">1000+ personnes</span> qui ont récupéré leurs droits
          </h3>
          <p className="text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Moyenne de <span className="text-green-400 font-semibold">650€ récupérés</span> par client • 
            <span className="text-blue-400 font-semibold"> 97% de taux de réussite</span> • 
            <span className="text-purple-400 font-semibold"> Résultat en 2 minutes</span>
          </p>
          
          <Button size="lg" className="group mb-4">
            <Link href="/wizard" className="flex items-center">
              C&apos;est parti, je récupère mes droits !
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <p className="text-xs sm:text-sm text-gray-400">
            ⚡ Résultat immédiat • 💰 7,90€ seulement • 🛡️ Satisfaction garantie
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials