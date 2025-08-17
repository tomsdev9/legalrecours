"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import useWizard from "@/hooks/useWizard"
import { ORGANISMS } from "@/lib/wizard-data"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Heart,
  Briefcase,
  AlertCircle,
} from "lucide-react"

const UserInfoStep = () => {
  const { state, updateUserInfo } = useWizard()

  // ✅ Hook is now before any early return
  const organismField = useMemo(() => {
    switch (state.selectedOrganism) {
      case "CAF":
        return {
          key: "cafNumber" as const,
          label: "Numéro allocataire (CAF)",
          placeholder: "ex : 7673083",
          icon: Building2,
          helpText:
            "N° DOSSIER sur vos courriers CAF (en haut à gauche). 7 à 8 chiffres, sans espaces.",
          type: "numeric" as const,
          pattern: /^\d{7,8}$/,
          maxLength: 8,
        }
      case "CPAM":
        return {
          key: "cpamNumber" as const,
          label: "Numéro de sécurité sociale",
          placeholder: "ex : 1 85 12 75 116 001 23",
          icon: Heart,
          helpText:
            "13 à 15 chiffres (clef incluse). Les espaces seront ignorés.",
          type: "numeric" as const,
          pattern: /^\d{13,15}$/,
          maxLength: 20,
        }
      case "POLE_EMPLOI":
        return {
          key: "poleEmploiNumber" as const,
          label: "Identifiant Pôle Emploi",
          placeholder: "ex : 1234567A",
          icon: Briefcase,
          helpText:
            "Identifiant alphanumérique figurant sur vos documents Pôle Emploi.",
          type: "alnum" as const,
          pattern: /^[A-Za-z0-9]{7,12}$/,
          maxLength: 12,
        }
      default:
        return null
    }
  }, [state.selectedOrganism])

  // You can safely early-return after hooks
  if (!state.selectedOrganism) {
    return (
      <div className="text-center">
        <p className="text-gray-400">
          Veuillez d&apos;abord sélectionner un organisme
        </p>
      </div>
    )
  }

  const organismData = ORGANISMS[state.selectedOrganism]
  const { userInfo } = state

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validateZipCode = (zipCode: string) => /^\d{5}$/.test(zipCode)

  const getFieldError = (fieldName: string, value: string) => {
    const required = ["firstName", "lastName", "email", "address", "city", "zipCode"]
    if (!value && required.includes(fieldName)) return "Ce champ est requis"
    if (fieldName === "email" && value && !validateEmail(value)) {
      return "Format d'email invalide"
    }
    if (fieldName === "zipCode" && value && !validateZipCode(value)) {
      return "Code postal invalide (5 chiffres)"
    }
    return null
  }

  const inputSections = [
    {
      section: "Informations personnelles",
      fields: [
        {
          key: "firstName" as const,
          label: "Prénom",
          type: "text",
          placeholder: "Jean",
          icon: User,
          required: true,
          helpText: undefined,
        },
        {
          key: "lastName" as const,
          label: "Nom",
          type: "text",
          placeholder: "Dupont",
          icon: User,
          required: true,
          helpText: undefined,
        },
        {
          key: "email" as const,
          label: "Email",
          type: "email",
          placeholder: "jean.dupont@email.com",
          icon: Mail,
          required: true,
          helpText: "Pour recevoir votre courrier généré",
        },
        {
          key: "phone" as const,
          label: "Téléphone",
          type: "tel",
          placeholder: "06 12 34 56 78",
          icon: Phone,
          required: false,
          helpText: "Optionnel — utile dans certains courriers",
        },
      ],
    },
    {
      section: "Adresse postale",
      fields: [
        {
          key: "address" as const,
          label: "Adresse",
          type: "text",
          placeholder: "123 rue de la République",
          icon: MapPin,
          required: true,
          helpText: undefined,
        },
        {
          key: "city" as const,
          label: "Ville",
          type: "text",
          placeholder: "Paris",
          icon: MapPin,
          required: true,
          helpText: undefined,
        },
        {
          key: "zipCode" as const,
          label: "Code postal",
          type: "text",
          placeholder: "75001",
          icon: MapPin,
          required: true,
          helpText: undefined,
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 mb-6">
          <User className="w-5 h-5 text-blue-400" />
          <span className="text-white font-medium">Vos informations</span>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
          Renseignez vos coordonnées pour personnaliser votre courrier officiel.
          Ces informations apparaîtront sur votre document.
        </p>
      </motion.div>

      {/* Form sections */}
      <div className="max-w-2xl mx-auto space-y-8">
        {inputSections.map((section, sIdx) => (
          <motion.div
            key={section.section}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sIdx * 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {sIdx + 1}
              </div>
              {section.section}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field, fIdx) => {
                const Icon = field.icon
                const value = userInfo[field.key] || ""
                const error = getFieldError(field.key, value)
                const showError = !!(error && value !== "")

                return (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: sIdx * 0.2 + fIdx * 0.1 }}
                    className={field.key === "address" ? "md:col-span-2" : ""}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-blue-400" />
                        <label className="text-white font-medium">
                          {field.label}
                          {field.required && (
                            <span className="text-red-400 ml-1">*</span>
                          )}
                        </label>
                        {field.helpText && (
                          <div className="group relative">
                            <AlertCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 border border-white/10 max-w-60 text-center">
                              {field.helpText}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          type={field.type}
                          value={value}
                          onChange={(e) => updateUserInfo(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className={`w-full p-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 backdrop-blur-sm ${
                            showError
                              ? "border-red-500/50 focus:border-red-500/50"
                              : "border-white/20 focus:border-blue-500/50"
                          }`}
                        />

                        {showError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>{error}</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Organism-specific field */}
        {organismField && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              Information {organismData.shortName}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <organismField.icon className="w-5 h-5 text-blue-400" />
                <label className="text-white font-medium">
                  {organismField.label}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="group relative">
                  <AlertCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 border border-white/10">
                    {organismField.helpText}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  inputMode={organismField.type === "numeric" ? "numeric" : "text"}
                  maxLength={organismField.maxLength}
                  value={userInfo[organismField.key] || ""}
                  onChange={(e) => {
                    const raw = e.target.value
                    let cleaned = raw
                    if (organismField.type === "numeric") {
                      cleaned = raw.replace(/\D+/g, "")
                    } else if (organismField.type === "alnum") {
                      cleaned = raw.replace(/[^a-zA-Z0-9]/g, "")
                    }
                    updateUserInfo(organismField.key, cleaned)
                  }}
                  placeholder={organismField.placeholder}
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                />

                {/* Minimal feedback si pattern non respecté */}
                {(() => {
                  const v = String(userInfo[organismField.key] || "")
                  if (!v) return null
                  if (!organismField.pattern?.test(v)) {
                    return <p className="mt-2 text-sm text-red-400">Format invalide.</p>
                  }
                  return null
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            🔒 Confidentialité et sécurité
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="text-green-400 font-medium mb-2">Données sécurisées</h4>
              <p className="text-gray-300 leading-relaxed">
                Vos informations sont utilisées uniquement pour générer votre courrier.
              </p>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Non-stockage</h4>
              <p className="text-gray-300 leading-relaxed">
                Aucune donnée personnelle n&apos;est conservée après génération.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glass rounded-xl p-6 border border-blue-500/30">
          <h4 className="text-white font-semibold mb-3">Récapitulatif :</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Organisme :</span>
              <p className="text-white font-medium">{organismData.shortName}</p>
            </div>
            <div>
              <span className="text-gray-400">Problème :</span>
              <p className="text-white font-medium">{state.caseData?.title}</p>
            </div>
            <div>
              <span className="text-gray-400">Prochaine étape :</span>
              <p className="text-green-400 font-medium">Validation & Paiement</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserInfoStep
