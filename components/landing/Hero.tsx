"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, CheckCircle, FileText } from "lucide-react"
import Link from "next/link"

const Hero = () => {
  const stats = [
    { number: "97%", label: "Taux de réussite" },
    { number: "2 min", label: "Temps moyen" },
    { number: "1000+", label: "Clients satisfaits" },
  ]

  const problemSolved = [
    "Réclamation CAF non versement",
    "Contestation radiation Pôle emploi",
    "CPAM remboursement refusé",
    "Trop-perçu à contester",
  ]

  return (
    <section className="relative min-h-[82vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-12 sm:pt-16">
      {/* Background animé */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge annonce */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 mb-8 border border-blue-400/20"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-100">
              🚀 Nouveau : IA expert en droit administratif français
            </span>
          </motion.div>

          {/* Titre principal – anti-hyphens + meilleure réactivité */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bold mb-6 leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mx-auto max-w-[1100px] px-2 break-normal"
            style={{ hyphens: "none" }} // empêche "recla-mez"
          >
            <span className="block">
              Contestez, demandez un réexamen,{" "}
              <span className="whitespace-nowrap">réclamez&nbsp;:</span>
            </span>
            <span className="block gradient-text mt-2">Lettre prête en 2 minutes</span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Adaptée à votre cas (trop-perçu, non-versement, radiation…). PDF A4 soigné.
          </motion.p>

          {/* Problèmes résolus – Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-12"
          >
            {problemSolved.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 p-[1px]"
              >
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 glass">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm sm:text-base text-gray-200">{p}</span>
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button size="xl" className="group px-6">
              <Link
                href="/wizard"
                className="inline-flex items-center gap-2 flex-nowrap whitespace-nowrap max-w-full min-w-0"
              >
                <FileText className="w-5 h-5 shrink-0 self-center" />
                <span className="truncate leading-none">Créer mon courrier maintenant</span>
                <ArrowRight className="w-5 h-5 shrink-0 self-center transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button variant="outline" size="xl" className="px-6">
              <Link
                href="#comment-ca-marche"
                className="inline-flex items-center gap-2 flex-nowrap whitespace-nowrap"
              >
                Comment ça marche ?
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-3 gap-6 sm:gap-8 max-w-md mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Indicateurs de confiance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-14 sm:mt-16 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Conformité juridique garantie</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-600" />
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-600" />
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Résultat immédiat</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
