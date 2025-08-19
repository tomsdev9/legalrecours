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
import { ScrollToTopOnChange } from "@/components/ScrollToTop" // 👈 AJOUT

function LegalRecoursLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className + " w-auto"} viewBox="0 0 760 120" role="img" aria-label="LegalRecours" xmlns="http://www.w3.org/2000/svg">
      <text
        x="0" y="86" fill="#222223"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        fontWeight="800" fontSize="78" letterSpacing="-1.5"
      >
        LegalRecours
      </text>
    </svg>
  )
}

const Inner = () => {
  const { state, currentStepData, navigation, validateCurrentStep, setError, clearError } = useWizard()

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
    <div className="min-h-screen bg-white">
      {/* 👇 Ancre pour le scroll en haut */}
      <div id="wizard-top" />
      {/* 👇 Déclenche le scroll à chaque changement d’étape */}
      <ScrollToTopOnChange dep={state.currentStep} />

      {/* Background blobs - adapté fond blanc */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-20 w-96 h-96 bg-gray-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gray-300 rounded-full blur-3xl"
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
              className="flex items-center"
            >
              <LegalRecoursLogo className="h-9 sm:h-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-right"
            >
              <p className="text-gray-900 font-semibold">
                Étape {state.currentStep} sur {5}
              </p>
              <p className="text-muted text-sm">{currentStepData?.title}</p>
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
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-700 text-sm font-medium">
                    {state.error}
                  </p>
                  <button
                    onClick={clearError}
                    className="ml-auto text-red-600 hover:text-red-700 transition-colors"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step wrapper */}
            <div className="glass-white border border-gray-200 rounded-xl p-6 sm:p-8 lg:p-12 mb-8 shadow-lg">
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
                      className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                      {currentStepData?.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-secondary text-lg max-w-2xl mx-auto"
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
                    className="group border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Précédent
                  </Button>
                )}
              </div>

              {/* Step counter */}
              <div className="text-center">
                <p className="text-muted text-sm">
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
                    className="group inline-flex items-center whitespace-nowrap bg-[#222223] hover:bg-black text-white"
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
                    <p className="text-muted text-sm">
                      Dernière étape - Validez votre commande
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container-custom py-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-muted text-sm">
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
