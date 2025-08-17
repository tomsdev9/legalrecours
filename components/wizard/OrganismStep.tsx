"use client"

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import useWizard from '@/hooks/useWizard'
import { ORGANISMS } from '@/lib/wizard-data'
import { OrganismType } from '@/types/wizard'
import { Building2, Heart, Briefcase, CheckCircle, Euro, Users, TrendingUp } from 'lucide-react'

const OrganismStep = () => {
  const { state, selectOrganism } = useWizard()

  // Debug: Watch state changes
  useEffect(() => {
    console.log('🔍 DEBUG - selectedOrganism changed to:', state.selectedOrganism)
  }, [state.selectedOrganism])

  const organisms = [
    {
      type: 'CAF' as OrganismType,
      data: ORGANISMS.CAF,
      icon: Building2,
      color: 'from-blue-500 to-cyan-500',
      stats: '650€ en moyenne récupérés',
      examples: ['APL non versée', 'Trop-perçu contesté', 'RSA suspendu', 'Prime d\'activité']
    },
    {
      type: 'CPAM' as OrganismType,
      data: ORGANISMS.CPAM,
      icon: Heart,
      color: 'from-green-500 to-emerald-500',
      stats: '450€ en moyenne récupérés',
      examples: ['Soins refusés', 'Retard remboursement', 'Arrêt travail', 'Transport sanitaire']
    },
    {
      type: 'POLE_EMPLOI' as OrganismType,
      data: ORGANISMS.POLE_EMPLOI,
      icon: Briefcase,
      color: 'from-purple-500 to-pink-500',
      stats: '1200€ en moyenne récupérés',
      examples: ['Radiation injuste', 'Allocations coupées', 'Trop-perçu ARE', 'Attestation manquante']
    }
  ]

  const handleOrganismSelect = (organismType: OrganismType) => {
    console.log('🔍 DEBUG - Organism selected:', organismType)
    selectOrganism(organismType)
    
    // Check state after a small delay to see if it updates
    setTimeout(() => {
      console.log('🔍 DEBUG - State after 100ms:', state.selectedOrganism)
    }, 100)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
          Choisissez l&apos;organisme administratif avec qui vous avez un problème. 
          Notre IA connaît les procédures spécifiques de chacun.
        </p>
      </motion.div>

      {/* Organisms grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {organisms.map((organism, index) => {
          const Icon = organism.icon
          const isSelected = state.selectedOrganism === organism.type

          return (
            <motion.div
              key={organism.type}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOrganismSelect(organism.type)}
              className={`
                relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group
                ${isSelected 
                  ? 'border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }
              `}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${organism.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {organism.data.shortName}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {organism.data.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Euro className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium text-sm">
                    {organism.stats}
                  </span>
                </div>

                {/* Examples */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 font-medium">Problèmes courants :</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {organism.examples.slice(0, 2).map((example, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${organism.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          )
        })}
      </div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            ✅ Pourquoi nos courriers fonctionnent
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 text-sm">Procédures officielles respectées</span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300 text-sm">97% de taux de réussite</span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300 text-sm">1000+ clients satisfaits</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selected organism info */}
      {state.selectedOrganism && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-xl p-6 border border-blue-500/30">
            <h4 className="text-white font-semibold mb-3">Organisme sélectionné :</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">{ORGANISMS[state.selectedOrganism].shortName[0]}</span>
              </div>
              <div>
                <p className="text-white font-medium">{ORGANISMS[state.selectedOrganism].name}</p>
                <p className="text-gray-400 text-sm">{ORGANISMS[state.selectedOrganism].description}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm text-center">
                ✓ Prêt pour l&apos;étape suivante - Décrivez votre problème
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default OrganismStep