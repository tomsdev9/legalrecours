"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle,} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 bg-white">
      {/* Background animé */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-gray-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10 text-center">
        {/* SECTION CENTRÉE COMPACTE */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bold mb-4 leading-tight tracking-tight text-2xl sm:text-3xl lg:text-4xl text-gray-900"
            style={{ hyphens: "none" }}
          >
            Vos recours CAF, CPAM et France Travail générés en quelques clics
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Contestez un trop-perçu, réclamez un paiement ou refusez une radiation avec des courriers juridiques prêts à envoyer.
          </motion.p>
        </div>

        {/* VIDÉO (portrait) + panneau de droite */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Col gauche : vidéo portrait (autoplay) */}
            <div className="relative">
              <div className="relative rounded-2xl bg-white shadow-xl p-3 lg:p-4">
                <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[9/16] sm:aspect-[2/3]">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    // poster="/legalrecours-hero-poster.jpg" // optionnel si tu ajoutes une vignette
                  >
                    <source src="/legalrecours-hero.mp4" type="video/mp4" />
                    Votre navigateur ne supporte pas la vidéo.
                  </video>
                </div>
              </div>
            </div>

            {/* Col droite : pitch + mini-card document */}
            <div className="flex flex-col justify-center gap-5 lg:gap-6 text-left max-w-xl mx-auto lg:mx-0">
              {/* Chip */}
              <div className="inline-flex items-center w-fit gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700">
                IA juridique • Courriers conformes
              </div>

              {/* Titre + pitch */}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                Plus de galère&nbsp;: on génère votre courrier, <span className="text-[#34D28D]">vous l’envoyez</span>.
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Notre IA prépare un <span className="font-medium">PDF prêt à l’emploi</span> en ~2 minutes&nbsp;:
                base légale, formulation pro, pièces à joindre et adresse LRAR. Vous téléchargez, signez, c’est parti.
              </p>

              {/* Liste des bénéfices */}
              <ul className="space-y-2 text-sm sm:text-base text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#34D28D]" />
                  CAF, CPAM, France Travail : modèles adaptés.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#34D28D]" />
                  Délais et voies de recours clairement indiqués.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#34D28D]" />
                  Téléchargement immédiat, paiement unique.
                </li>
              </ul>

              {/* CTA */}
              <div className="pt-1">
                <Button
                  asChild
                  className="px-5 py-3 bg-[#222223] hover:bg-black text-white font-medium rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Link href="/wizard">Générer mon courrier</Link>
                </Button>
              </div>

              {/* Mini card document (floutée + inclinée) */}
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                <div className="bg-white rounded-2xl shadow-xl p-3 border border-gray-200 rotate-[-3deg]">
                  <div className="relative rounded-xl overflow-hidden">
                    <Image
                      src="/modellegalrecours.png"
                      alt="Aperçu du document PDF LegalRecours"
                      width={900}
                      height={1200}
                      sizes="(max-width: 640px) 100vw, 400px"
                      priority
                      className="w-full h-auto object-cover filter blur-[1px] brightness-[1.02]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex justify-center gap-8 mt-8"
        >
          {[
            { number: "97%", label: "Taux de réussite" },
            { number: "2 min", label: "Temps moyen" },
            { number: "1000+", label: "Courriers générés" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold mb-1 text-[#34D28D]">{stat.number}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
