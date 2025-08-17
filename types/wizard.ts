// Types pour le wizard LegalRecours

import { ContextData } from './common'
import { CaseData, CaseId } from '@/lib/wizard-data'

export type OrganismType = 'CAF' | 'CPAM' | 'POLE_EMPLOI'

// Re-export for backward compatibility
export type CaseCategory = CaseId

export interface ContextField {
  id: string
  label: string
  type: 'text' | 'textarea' | 'date' | 'number' | 'select' | 'radio' | 'checkbox'
  placeholder?: string
  required: boolean
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
  helpText?: string
  conditionalOn?: {
    field: string
    value: string | string[]
  }
}

export interface WizardStep {
  id: number
  title: string
  description: string
  component: string
}

export interface WizardState {
  // Current state
  currentStep: number
  isLoading: boolean
  error?: string
  
  // Step 1: Organism selection
  selectedOrganism?: OrganismType
  
  // Step 2: Case selection  
  selectedCase?: CaseCategory
  caseData?: CaseData
  
  // Step 3: Context details
  contextData: ContextData
  
  // Step 4: User information
  userInfo: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    address: string
    city: string
    zipCode: string
    
    // Organism specific identifiers
    cafNumber?: string
    cpamNumber?: string
    poleEmploiNumber?: string
  }
  
  // Step 5: Review & payment
  documentPreview?: string
  stripeSessionId?: string
  paymentStatus?: 'pending' | 'processing' | 'success' | 'failed'
}

export interface GenerateDocumentRequest {
  organism: OrganismType
  caseType: CaseId
  contextData: ContextData
  userInfo: WizardState['userInfo']
  caseData: CaseData
}

export interface GenerateDocumentResponse {
  success: boolean
  documentId: string
  content: string
  pdfUrl?: string
  error?: string
}

export interface StripeCheckoutRequest {
  documentData: GenerateDocumentRequest
  userEmail: string
}

export interface StripeCheckoutResponse {
  success: boolean
  sessionId: string
  url: string
  error?: string
}

// Navigation helpers
export interface WizardNavigation {
  canGoNext: boolean
  canGoPrevious: boolean
  isFirstStep: boolean
  isLastStep: boolean
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void
}

// Validation
export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
  warnings?: Record<string, string>
}

// Document generation
export interface DocumentTemplate {
  id: string
  organism: OrganismType
  caseType: CaseId
  subject: string
  template: string
  variables: string[]
  legalReferences: string[]
  recipientAddress: {
    name: string
    address: string[]
    city: string
    zipCode: string
  }
}

export interface ClaudePromptData {
  organism: OrganismType
  caseType: CaseId
  userInfo: WizardState['userInfo']
  contextData: ContextData
  legalDeadline: string
  template: DocumentTemplate
}

export interface PDFGenerationOptions {
  format: 'A4'
  margin: {
    top: string
    right: string
    bottom: string
    left: string
  }
  includeHeader: boolean
  includeFooter: boolean
  watermark?: string
}