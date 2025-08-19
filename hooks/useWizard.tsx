"use client"

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react"
import {
  WizardState,
  OrganismType,
  CaseCategory,
  ValidationResult,
  WizardNavigation,
} from "@/types/wizard"
import { ContextData, Primitive } from "@/types/common"
import { getCaseById, getContextFields, WIZARD_STEPS } from "@/lib/wizard-data"

const INITIAL_STATE: WizardState = {
  currentStep: 1,
  isLoading: false,
  error: undefined,
  selectedOrganism: undefined,
  selectedCase: undefined,
  caseData: undefined,
  contextData: {},
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cafNumber: "",
    cpamNumber: "",
    poleEmploiNumber: "",
  },
  documentPreview: undefined,
  stripeSessionId: undefined,
  paymentStatus: undefined,
}

/* ======================= Impl interne (un seul état partagé) ======================= */
function useWizardImpl() {
  const [state, setState] = useState<WizardState>(INITIAL_STATE)

  // BASIC
  const updateState = useCallback((updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])
  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading, error: undefined }))
  }, [])
  const setError = useCallback((error: string) => {
    setState((prev) => ({ ...prev, error, isLoading: false }))
  }, [])
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: undefined }))
  }, [])

  // NAV
  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= WIZARD_STEPS.length) {
      setState((prev) => ({ ...prev, currentStep: step, error: undefined }))
    }
  }, [])
  const nextStep = useCallback(() => {
    setState((prev) =>
      prev.currentStep < WIZARD_STEPS.length
        ? { ...prev, currentStep: prev.currentStep + 1, error: undefined }
        : prev
    )
  }, [])
  const previousStep = useCallback(() => {
    setState((prev) =>
      prev.currentStep > 1
        ? { ...prev, currentStep: prev.currentStep - 1, error: undefined }
        : prev
    )
  }, [])

  // STEP 1
  const selectOrganism = useCallback((organism: OrganismType) => {
    setState((prev) => ({
      ...prev,
      selectedOrganism: organism,
      selectedCase: undefined,
      caseData: undefined,
      contextData: {},
      error: undefined,
    }))
  }, [])

  // STEP 2
  const selectCase = useCallback((caseId: CaseCategory) => {
    const caseData = getCaseById(caseId)
    if (caseData) {
      setState((prev) => ({
        ...prev,
        selectedCase: caseId,
        caseData,
        contextData: {} as ContextData,
        error: undefined,
      }))
    }
  }, [])

  // STEP 3
  const updateContextData = useCallback((field: string, value: Primitive) => {
    setState((prev) => ({
      ...prev,
      contextData: {
        ...prev.contextData,
        [field]: value,
      },
      error: undefined,
    }))
  }, [])
  const setContextData = useCallback((data: Partial<ContextData>) => {
    setState((prev) => ({
      ...prev,
      contextData: { ...prev.contextData, ...data },
      error: undefined,
    }))
  }, [])

  // STEP 4
  const updateUserInfo = useCallback(
    (field: keyof WizardState["userInfo"], value: string) => {
      setState((prev) => ({
        ...prev,
        userInfo: {
          ...prev.userInfo,
          [field]: value,
        },
        error: undefined,
      }))
    },
    []
  )
  const setUserInfo = useCallback(
    (userInfo: Partial<WizardState["userInfo"]>) => {
      setState((prev) => ({
        ...prev,
        userInfo: { ...prev.userInfo, ...userInfo },
        error: undefined,
      }))
    },
    []
  )

  // STEP 5
  const setDocumentPreview = useCallback((preview: string) => {
    setState((prev) => ({ ...prev, documentPreview: preview }))
  }, [])
  const setStripeSession = useCallback((sessionId: string) => {
    setState((prev) => ({ ...prev, stripeSessionId: sessionId }))
  }, [])
  const setPaymentStatus = useCallback(
    (status: WizardState["paymentStatus"]) => {
      setState((prev) => ({ ...prev, paymentStatus: status }))
    },
    []
  )

  // VALIDATION
  const validateCurrentStep = useCallback((): ValidationResult => {
    const errors: Record<string, string> = {}

    switch (state.currentStep) {
      case 1: {
        if (!state.selectedOrganism) {
          errors.organism = "Veuillez sélectionner un organisme"
        }
        break
      }
      case 2: {
        if (!state.selectedCase) {
          errors.case = "Veuillez sélectionner votre problème"
        }
        break
      }
      case 3: {
        if (state.selectedCase) {
          const fields = getContextFields(state.selectedCase)
          fields.forEach((field) => {
            const value = state.contextData[field.id]
            if (field.required && (value === undefined || value === "")) {
              errors[field.id] = `${field.label} est requis`
            }
            if (field.validation && value !== undefined && value !== "") {
              const { min, max, pattern, message } = field.validation
              if (min !== undefined && typeof value === "number" && value < min)
                errors[field.id] = message || `Valeur minimum : ${min}`
              if (max !== undefined && typeof value === "number" && value > max)
                errors[field.id] = message || `Valeur maximum : ${max}`
              if (
                pattern &&
                typeof value === "string" &&
                !new RegExp(pattern).test(value)
              )
                errors[field.id] = message || "Format invalide"
            }
          })
        }
        break
      }
      case 4: {
        const required = [
          "firstName",
          "lastName",
          "email",
          "address",
          "city",
          "zipCode",
        ] as const
        required.forEach((f) => {
          if (!state.userInfo[f]) errors[f] = "Ce champ est requis"
        })
        if (
          state.userInfo.email &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.userInfo.email)
        ) {
          errors.email = "Format d'email invalide"
        }
        if (state.userInfo.zipCode && !/^\d{5}$/.test(state.userInfo.zipCode)) {
          errors.zipCode = "Code postal invalide (5 chiffres)"
        }

        // Organisme — validations dédiées
        if (state.selectedOrganism === "CAF") {
          const v = state.userInfo.cafNumber?.trim() || ""
          if (!v) {
            errors.cafNumber = "Numéro allocataire requis (7 à 8 chiffres)"
          } else if (!/^\d{7,8}$/.test(v)) {
            errors.cafNumber = "Format invalide (7 à 8 chiffres)"
          }
        }
        if (state.selectedOrganism === "CPAM") {
          const v = (state.userInfo.cpamNumber || "").replace(/\s+/g, "")
          if (!v) {
            errors.cpamNumber = "Numéro de sécurité sociale requis"
          } else if (!/^\d{13,15}$/.test(v)) {
            errors.cpamNumber =
              "Format invalide (13 à 15 chiffres, espaces ignorés)"
          }
        }
        if (state.selectedOrganism === "POLE_EMPLOI") {
          const v = state.userInfo.poleEmploiNumber?.trim() || ""
          if (!v) {
            errors.poleEmploiNumber = "Identifiant France Travail requis"
          } else if (!/^[A-Za-z0-9]{7,12}$/.test(v)) {
            errors.poleEmploiNumber =
              "Format invalide (7 à 12 caractères alphanumériques)"
          }
        }
        break
      }
      case 5:
        break
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }, [state])

  // COMPUTED
  const navigation: WizardNavigation = useMemo(() => {
    const validation = validateCurrentStep()
    return {
      canGoNext: validation.isValid,
      canGoPrevious: state.currentStep > 1,
      isFirstStep: state.currentStep === 1,
      isLastStep: state.currentStep === WIZARD_STEPS.length,
      nextStep,
      previousStep,
      goToStep,
    }
  }, [state.currentStep, validateCurrentStep, nextStep, previousStep, goToStep])

  const currentStepData = useMemo(
    () => WIZARD_STEPS.find((step) => step.id === state.currentStep),
    [state.currentStep]
  )

  const progress = useMemo(
    () => (state.currentStep / WIZARD_STEPS.length) * 100,
    [state.currentStep]
  )

  const isComplete = useMemo(
    () =>
      state.currentStep === WIZARD_STEPS.length &&
      state.paymentStatus === "success",
    [state.currentStep, state.paymentStatus]
  )

  // RESET
  const reset = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])
  const resetFromStep = useCallback((step: number) => {
    setState((prev) => {
      const next = { ...prev }
      if (step <= 1) next.selectedOrganism = undefined
      if (step <= 2) {
        next.selectedCase = undefined
        next.caseData = undefined
      }
      if (step <= 3) next.contextData = {} as ContextData
      if (step <= 4) next.userInfo = INITIAL_STATE.userInfo
      if (step <= 5) {
        next.documentPreview = undefined
        next.stripeSessionId = undefined
        next.paymentStatus = undefined
      }
      return next
    })
  }, [])

  return {
    // State
    state,
    currentStepData,
    progress,
    isComplete,
    navigation,

    // Actions
    updateState,
    setLoading,
    setError,
    clearError,

    // Nav
    goToStep,
    nextStep,
    previousStep,

    // Step 1
    selectOrganism,

    // Step 2
    selectCase,

    // Step 3
    updateContextData,
    setContextData,

    // Step 4
    updateUserInfo,
    setUserInfo,

    // Step 5
    setDocumentPreview,
    setStripeSession,
    setPaymentStatus,

    // Validation
    validateCurrentStep,

    // Reset
    reset,
    resetFromStep,
  }
}

/* ======================= CONTEXT + PROVIDER ======================= */
type WizardCtx = ReturnType<typeof useWizardImpl> | null
const WizardContext = createContext<WizardCtx>(null)
WizardContext.displayName = "WizardContext"

type WizardProviderProps = React.PropsWithChildren<{}>

export function WizardProvider({ children }: WizardProviderProps) {
  const value = useWizardImpl()
  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  )
}

/** Hook public (à utiliser sous <WizardProvider>) */
export default function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error("useWizard must be used within <WizardProvider>")
  return ctx
}
