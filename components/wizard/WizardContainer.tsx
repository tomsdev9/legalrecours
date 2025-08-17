"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import useWizard, { WizardProvider } from "@/hooks/useWizard"
import StepIndicator from "./StepIndicator"
import OrganismStep from "./OrganismStep"
import CaseStep from "./CaseStep"
import ContextStep from "./ContextStep"
import UserInfoStep from "./UserInfoStep"
import ReviewStep from "./ReviewStep"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react"

const Inner = () => {
  const {
    state,
    currentStepData,
    navigation,
    validateCurrentStep,
    setError,
    clearError,
  } = useWizard()

  const renderCurrentStep = () => {
    const steps = {
      1: <OrganismStep />,
      2: <CaseStep />,
      3: <ContextStep />,
      4: <UserInfoStep />,
      5: <ReviewStep />,
    }
    return steps[state.currentStep as keyof typeof steps] || null
  }

  const handleNext = () => {
    clearError()
    const validation = validateCurrentStep()
    if (validation.isValid) {
      navigation.nextStep()
    } else {
      const firstError = Object.values(validation.errors)[0]
      if (firstError) setError(firstError)
    }
  }

  const handlePrevious = () => {
    clearError()
    navigation.previousStep()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container-custom py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">LR</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">LegalRecours</h1>
                <p className="text-gray-400 text-sm">Assistant juridique IA</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-right"
            >
              <p className="text-white font-semibold">
                Étape {state.currentStep} sur {5}
              </p>
              <p className="text-gray-400 text-sm">{currentStepData?.title}</p>
            </motion.div>
          </div>
        </header>

        {/* Progress */}
        <div className="container-custom mb-8">
          <StepIndicator />
        </div>

        {/* Main */}
        <main className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Error */}
            <AnimatePresence>
              {state.error && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-200 text-sm font-medium">
                    {state.error}
                  </p>
                  <button
                    onClick={clearError}
                    className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step wrapper */}
            <div className="glass rounded-3xl p-6 sm:p-8 lg:p-12 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="text-center mb-8">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                      {currentStepData?.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-gray-300 text-lg max-w-2xl mx-auto"
                    >
                      {currentStepData?.description}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {renderCurrentStep()}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12"
            >
              {/* Prev */}
              <div className="flex-1">
                {navigation.canGoPrevious && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handlePrevious}
                    disabled={state.isLoading}
                    className="group"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Précédent
                  </Button>
                )}
              </div>

              {/* Step counter */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  {state.currentStep} / {5}
                </p>
              </div>

              {/* Next */}
              <div className="flex-1 flex justify-end">
                {!navigation.isLastStep ? (
                  <Button
                    size="lg"
                    onClick={handleNext}
                    disabled={state.isLoading || !navigation.canGoNext}
                    aria-disabled={state.isLoading || !navigation.canGoNext}
                    className="group inline-flex items-center whitespace-nowrap"
                  >
                    {state.isLoading ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Chargement...
                      </>
                    ) : (
                      <>
                        Suivant
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      Dernière étape - Validez votre commande
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container-custom py-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              🔒 Vos données sont sécurisées et ne sont pas stockées après génération
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

/** Container exposé avec Provider global pour partager l'état du wizard */
const WizardContainer = () => (
  <WizardProvider>
    <Inner />
  </WizardProvider>
)

export default WizardContainer
