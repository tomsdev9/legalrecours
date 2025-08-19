"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle, Play, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 bg-white">
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
        <div className="max-w-4xl mx-auto mb-12">
          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bold mb-4 leading-tight tracking-tight text-2xl sm:text-3xl lg:text-4xl text-gray-900"
            style={{ hyphens: "none" }}
          >
            Une solution tout-en-un, pour récupérer tous vos droits.
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Créez les meilleurs courriers de recours CAF, CPAM et France Travail avec LegalRecours
          </motion.p>

          {/* CTA principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-4"
          >
            <Button
              asChild
              className="px-8 py-3 bg-[#222223] hover:bg-black text-white font-semibold text-base rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Link href="/wizard">Créer mon courrier</Link>
            </Button>
          </motion.div>

          {/* Avis clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-gray-50 border border-gray-200 backdrop-blur-sm mb-6"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-900">4.9/5</span>
              <span className="text-gray-700 ml-1">(1,247 avis)</span>
            </div>
            <div className="text-xs text-gray-600 hidden sm:block">Déjà adopté par les plus grands</div>
          </motion.div>

          {/* Problèmes résolus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid grid-cols-2 gap-2 mb-8 max-w-xs mx-auto sm:flex sm:flex-wrap sm:justify-center sm:max-w-2xl"
          >
            {[
              "Trop-perçu à contester",
              "Réclamation CAF non versée",
              "Radiation France Travail",
              "CPAM remboursement refusé",
            ].map((problem, i) => (
              <motion.div
                key={problem}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                className="flex items-center justify-center gap-2 px-3 py-2 min-h-[52px] text-center rounded-xl bg-gray-50 border border-gray-200"
              >
                <CheckCircle className="w-3 h-3 shrink-0 text-[#34D28D]" />
                <span className="text-[13px] sm:text-sm text-gray-800 leading-snug">
                  {problem}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* VIDÉO GRANDE EN DESSOUS */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* ✅ border supprimée ici */}
            <div className="relative rounded-2xl bg-white shadow-xl p-3">
              <div className="absolute inset-0 rounded-2xl bg-gray-50/50"></div>
              <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video">
                <video
                  className="w-full h-full object-cover"
                  autoPlay={isVideoPlaying}
                  muted
                  loop
                  playsInline
                  poster="/demo-thumbnail.jpg"
                >
                  <source src="/demo-legalrecours.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la vidéo.
                </video>
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/5 transition-colors cursor-pointer"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  {!isVideoPlaying && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center justify-center w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200"
                    >
                      <Play className="w-10 h-10 text-gray-700 ml-1" />
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-xs font-medium text-red-700">Démo en direct</span>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 z-10">
                <div className="px-3 py-1 rounded-lg bg-gray-900/90 backdrop-blur-sm">
                  <span className="text-sm text-white font-medium">2:30</span>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center mt-6"
            >
              <p className="text-base text-gray-800 mb-2">
                🎯 <span className="font-medium text-[#34D28D]">Processus complet</span> en 2 minutes
              </p>
              <p className="text-sm text-gray-600">Du diagnostic à la génération PDF</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex justify-center gap-8 mt-12"
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
