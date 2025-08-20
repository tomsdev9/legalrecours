"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const Testimonials = () => {
  const t = {
    age: "29 ans, salariée",
    problem: "CPAM — remboursement post-opératoire refusé",
    result: "Remboursée intégralement + intérêts de retard",
    quote:
      "J’avais abandonné après deux refus. Le courrier LegalRecours citait précisément la base légale : la CPAM a remboursé en 10 jours. Soulagement total.",
    rating: 5,
    timeAgo: "Il y a 3 semaines",
  }

  return (
    <section className="py-6 sm:py-10 lg:py-14 relative overflow-hidden px-4">
      {/* décor subtil */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 0.02, y: 0 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-6 w-40 h-40 sm:w-72 sm:h-72 bg-gray-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          whileInView={{ opacity: 0.02, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 right-6 w-48 h-48 sm:w-80 sm:h-80 bg-gray-300 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header compact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-5 text-gray-900">
            Ils ont récupéré leurs <span className="gradient-text">droits</span>
          </h2>
          <p className="text-sm sm:text-xl text-secondary max-w-3xl mx-auto px-2 sm:px-4">
            Des milliers d’euros remboursés — CPAM, CAF, France Travail
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-4 glass-white border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-6 py-1.5 sm:py-3 w-fit mx-auto shadow-sm"
          >
            <div className="flex gap-0.5 sm:gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-gray-900 font-semibold ml-1 sm:ml-2 text-xs sm:text-base">4.9/5</span>
            <span className="text-muted text-[11px] sm:text-sm">(1 247 avis)</span>
          </motion.div>
        </motion.div>

        {/* CARD UNIQUE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-[440px] sm:max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xl sm:shadow-2xl">
            {/* Badge (mini en mobile) */}
            <div className="absolute z-10 top-2 left-2 sm:top-4 sm:left-4">
              <span className="inline-flex items-center gap-1 px-2 py-[2px] sm:px-3 sm:py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[10px] sm:text-xs font-medium">
                CPAM • Remboursement validé
              </span>
            </div>

            {/* Image : carré sur mobile, plus large au-delà */}
            <div className="relative aspect-square sm:aspect-[16/10] lg:aspect-[16/9]">
              <Image
                src="/legalrecoursdroit.jpg"
                alt="Cliente LegalRecours heureuse, remboursement CPAM obtenu"
                fill
                priority
                className="object-cover"
              />

              {/* Overlay bas ultra compact en mobile */}
              <div className="absolute inset-x-0 bottom-0">
                <div
                  className="
                    bg-gradient-to-t from-black/85 via-black/50 to-transparent
                    px-3 py-3 sm:px-6 sm:py-6
                    text-white
                  "
                >
                  {/* Ligne “Témoignage” */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <Quote className="w-3.5 h-3.5 sm:w-5 sm:h-5 opacity-80" />
                    <span className="text-[10px] sm:text-xs uppercase tracking-wide opacity-80">
                      Témoignage
                    </span>
                  </div>

                  {/* Citation (petite en mobile) */}
                  <p className="text-[12px] sm:text-base leading-snug sm:leading-relaxed">
                    « {t.quote} »
                  </p>

                  {/* Étoiles + temps */}
                  <div className="mt-2 sm:mt-3 flex items-center gap-1.5 sm:gap-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-[10px] sm:text-xs opacity-80">— {t.timeAgo}</span>
                  </div>

                  {/* Infos compactes */}
                  <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2">
                    <div className="text-[11px] sm:text-sm opacity-95">{t.age}</div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {/* Sur mobile : on garde seulement le résultat (vert), on cache le problème (rouge) pour alléger */}
                      <span className="inline-flex items-center px-2 py-[2px] sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs bg-green-500/20 border border-green-300/40">
                        Résultat&nbsp;: {t.result}
                      </span>
                      <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-red-500/20 border border-red-300/40">
                        Problème&nbsp;: {t.problem}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /image + overlay */}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
