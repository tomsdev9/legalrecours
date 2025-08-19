"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const Testimonials = () => {
  const [showAllMobile, setShowAllMobile] = useState(false)

  const testimonials = [
    {
      name: "Sarah M.",
      age: "32 ans, mère célibataire",
      problem: "Trop-perçu CAF de 1200€",
      result: "890€ récupérés en 15 jours",
      quote:
        "J'étais paniquée quand j'ai reçu le courrier de la CAF. Avec LegalRecours, j'ai pu contester et prouver que l'erreur venait d'eux. Un poids énorme en moins !",
      rating: 5,
      timeAgo: "Il y a 2 semaines",
    },
    {
      name: "Julien R.",
      age: "28 ans, auto-entrepreneur",
      problem: "Radiation France Travail injustifiée",
      result: "Réintégration + allocations reprises",
      quote:
        "Radié pour une absence que j'avais pourtant signalée. Le courrier de LegalRecours était parfait, avec toutes les références légales. Réintégré en 10 jours !",
      rating: 5,
      timeAgo: "Il y a 1 mois",
    },
    {
      name: "Michel P.",
      age: "45 ans, commercial",
      problem: "CPAM refus remboursement",
      result: "650€ de soins remboursés",
      quote:
        "La CPAM refusait mes séances de kiné. Grâce au courrier généré, ils ont reconnu leur erreur et tout remboursé avec les intérêts de retard.",
      rating: 5,
      timeAgo: "Il y a 3 semaines",
    },
    {
      name: "Marie L.",
      age: "36 ans, infirmière",
      problem: "APL non versée depuis 3 mois",
      result: "2100€ d'arriérés récupérés",
      quote:
        "3 mois sans APL à cause d'un bug informatique. Leurs services n'arrivaient pas à débloquer. Une lettre de réclamation et tout s'est débloqué en 1 semaine.",
      rating: 5,
      timeAgo: "Il y a 1 semaine",
    },
    {
      name: "Thomas D.",
      age: "24 ans, étudiant",
      problem: "Bourse CROUS suspendue",
      result: "Bourse rétablie + rattrapage",
      quote:
        "Ma bourse était suspendue pour des documents soi-disant manquants. Le courrier a prouvé que j'avais tout envoyé. Merci LegalRecours !",
      rating: 5,
      timeAgo: "Il y a 2 mois",
    },
    {
      name: "Céline B.",
      age: "41 ans, divorcée",
      problem: "Prime d'activité calculée à tort",
      result: "450€ de rattrapage obtenu",
      quote:
        "Le calcul de ma prime d'activité était faux depuis 6 mois. Ils m'ont remboursé tout l'arriéré plus les excuses pour l'erreur.",
      rating: 5,
      timeAgo: "Il y a 3 semaines",
    },
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden px-4">
      {/* Background decorations - adapté fond blanc */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 0.02, y: 0 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-4 sm:left-10 w-60 h-60 sm:w-80 sm:h-80 bg-gray-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 0.02, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 right-4 sm:right-10 w-72 h-72 sm:w-96 sm:h-96 bg-gray-300 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header - titre réduit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            Ils ont récupéré leurs <span className="gradient-text">droits</span>
          </h2>
          <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto px-4">
            Plus de 1000 courriers générés, des milliers d&apos;euros récupérés
          </p>

          {/* Overall rating - adapté fond blanc */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-6 sm:mt-8 glass-white border border-gray-200 rounded-xl px-4 sm:px-6 py-2 sm:py-3 w-fit mx-auto shadow-sm"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-gray-900 font-semibold ml-2 text-sm sm:text-base">4.9/5</span>
            <span className="text-muted text-xs sm:text-sm">(1,247 avis)</span>
          </motion.div>
        </motion.div>

        {/* Testimonials grid - MOBILE (3 avis + bouton) */}
        <div className="sm:hidden">
          <div
            className="grid grid-cols-1 gap-4 mb-6"
            id="testimonials-mobile"
          >
            {(showAllMobile ? testimonials : testimonials.slice(0, 3)).map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group relative"
              >
                {/* Quote icon */}
                <Quote className="w-6 h-6 text-gray-400 mb-3 opacity-50" />

                {/* Quote */}
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Author info */}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted">{testimonial.age}</p>
                    </div>
                    <span className="text-xs text-muted">{testimonial.timeAgo}</span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-red-600">
                      <span className="font-medium">Problème:</span> {testimonial.problem}
                    </p>
                    <p className="text-xs text-green-600">
                      <span className="font-medium">Résultat:</span> {testimonial.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => setShowAllMobile((v) => !v)}
            className="w-full text-sm px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 hover:bg-gray-100 transition text-gray-700"
            aria-expanded={showAllMobile}
            aria-controls="testimonials-mobile"
          >
            {showAllMobile ? "Moins d'avis" : "Plus d'avis"}
          </button>
        </div>

        {/* Testimonials grid - DESKTOP/TABLET (tous les avis) */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 sm:mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group relative"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gray-400 mb-4 opacity-50" />

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Author info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">{testimonial.name}</h4>
                    <p className="text-xs text-muted">{testimonial.age}</p>
                  </div>
                  <span className="text-xs text-muted">{testimonial.timeAgo}</span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-red-600">
                    <span className="font-medium">Problème:</span> {testimonial.problem}
                  </p>
                  <p className="text-xs text-green-600">
                    <span className="font-medium">Résultat:</span> {testimonial.result}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials