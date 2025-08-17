// components/wizard/ReviewStep.tsx
"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import useWizard from "@/hooks/useWizard"
import { ORGANISMS, type CaseId, type OrganismKey } from "@/lib/wizard-data"
import { getAttachmentsForCase } from "@/lib/letter-templates/attachments"
import {
  FileText,
  CreditCard,
  CheckCircle2,
  Building2,
  User,
  MessageSquare,
  Clock,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"

const ReviewStep = () => {
  const { state, setError, setLoading, navigation } = useWizard()

  // ✅ Tous les hooks AVANT tout return conditionnel
  const stats = useMemo(() => {
    const total = 4
    let completed = 0
    if (state.selectedOrganism) completed++
    if (state.selectedCase) completed++
    if (Object.keys(state.contextData ?? {}).length > 0) completed++
    if (state.userInfo.firstName && state.userInfo.lastName && state.userInfo.email) completed++
    return { completed, total, percentage: (completed / total) * 100 }
  }, [state.selectedOrganism, state.selectedCase, state.contextData, state.userInfo])

  const attachments = useMemo(() => {
    if (!state.selectedOrganism || !state.selectedCase) return []
    return getAttachmentsForCase(
      state.selectedCase as CaseId,
      state.selectedOrganism as OrganismKey,
      state.contextData
    )
  }, [state.selectedOrganism, state.selectedCase, state.contextData])

  const organismData = useMemo(
    () => (state.selectedOrganism ? ORGANISMS[state.selectedOrganism] : undefined),
    [state.selectedOrganism]
  )

  const handlePayment = async () => {
    try {
      setLoading(true)

      const payload = {
        organism: state.selectedOrganism as OrganismKey,
        caseId: state.selectedCase as CaseId,
        contextData: state.contextData,
        userInfo: {
          firstName: state.userInfo.firstName,
          lastName: state.userInfo.lastName,
          email: state.userInfo.email,
          address: state.userInfo.address,
          city: state.userInfo.city,
          zipCode: state.userInfo.zipCode
        }
      }
      sessionStorage.setItem("lastGeneratePayload", JSON.stringify(payload))

      const origin = window.location.origin
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metadata: {
            organism: payload.organism,
            caseId: payload.caseId,
            email: payload.userInfo.email
          },
          successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${origin}/checkout/cancel`
        })
      })

      if (!res.ok) throw new Error(`Checkout error: ${res.status}`)
      const { url } = (await res.json()) as { url?: string }
      if (!url) throw new Error("Checkout: URL manquante")
      window.location.href = url
    } catch {
      setError("Erreur lors de l’ouverture du paiement. Réessayez dans un instant.")
    } finally {
      setLoading(false)
    }
  }

  // ✅ return conditionnel APRÈS les hooks (plus d’erreur “called conditionally”)
  if (!state.selectedOrganism || !state.selectedCase || !state.caseData) {
    return (
      <div className="text-center">
        <p className="text-gray-400">Veuillez compléter toutes les étapes précédentes.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="text-center"
      >
        <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 mb-6">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-white font-medium">Validation finale</span>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
          Vérifiez vos informations. Après <span className="font-semibold">paiement sécurisé</span>,
          votre courrier est généré automatiquement en PDF et téléchargé.
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }} className="max-w-2xl mx-auto"
      >
        <div className="glass rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Dossier complété</h3>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">{stats.completed}/{stats.total}</span>
            </div>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }} animate={{ width: `${stats.percentage}%` }}
              transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
            />
          </div>
          <p className="text-green-400 text-sm font-medium">✅ Prêt pour la génération du courrier</p>
        </div>
      </motion.div>

      {/* Summary (sans preview) */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }} className="space-y-4"
        >
          {/* Organisme */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-medium">Organisme</h4>
            </div>
            <p className="text-gray-300">{organismData?.name}</p>
            <p className="text-sm text-gray-400 mt-1">{organismData?.description}</p>
          </div>

          {/* Problème */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-purple-400" />
              <h4 className="text-white font-medium">Votre problème</h4>
            </div>
            <p className="text-gray-300">{state.caseData.title}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">Délai légal observé selon l’organisme</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">Ton formel • PDF A4 pro</span>
              </div>
            </div>
          </div>

          {/* Détails saisis */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <h4 className="text-white font-medium">Détails fournis</h4>
            </div>
            <div className="space-y-1">
              {Object.entries(state.contextData ?? {}).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="text-gray-400">{key}: </span>
                  <span className="text-gray-300">
                    {String(value ?? "").slice(0, 80)}
                    {String(value ?? "").length > 80 ? "…" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coordonnées */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-indigo-400" />
              <h4 className="text-white font-medium">Vos coordonnées</h4>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">
                {state.userInfo.firstName} {state.userInfo.lastName}
              </p>
              <p className="text-gray-400">{state.userInfo.email}</p>
              <p className="text-gray-400">{state.userInfo.address}</p>
              <p className="text-gray-400">
                {state.userInfo.zipCode} {state.userInfo.city}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }} className="space-y-4"
        >
          <div className="glass rounded-xl p-6">
            <h4 className="text-white font-medium mb-3">Ce que contiendra votre courrier</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
              <li>Objet exact adapté à votre cas</li>
              <li>Rappel des faits (dates, références) et explication concise</li>
              <li>Demande claire (réexamen, annulation, remise, etc.)</li>
              <li>Formule de politesse, signature, mise en page professionnelle</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              🔒 Aucun aperçu du texte n’est affiché avant paiement pour éviter la copie abusive.
            </p>
          </div>

          <div className="glass rounded-xl p-6 border border-blue-500/30">
            <h4 className="text-white font-medium mb-3">📎 Pièces à joindre (recommandées)</h4>
            {attachments.length ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-100 text-sm">
                {attachments.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            ) : (
              <p className="text-gray-300 text-sm">Aucune pièce spécifique n’est requise.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Paiement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }} className="max-w-2xl mx-auto"
      >
        <div className="glass rounded-2xl p-8 border-2 border-blue-500/30">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Génération de votre courrier</h3>
            <p className="text-gray-300">
              Votre document personnalisé sera généré et téléchargé immédiatement après paiement.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 mb-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-white">Courrier personnalisé</h4>
                <p className="text-gray-300 text-sm">IA + PDF professionnel</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">7,90€</div>
                <div className="text-sm text-gray-400">Paiement unique</div>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handlePayment}
            disabled={state.isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 text-lg"
          >
            {state.isLoading ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Traitement en cours…
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-3" />
                Payer 7,90€ et générer le courrier
              </>
            )}
          </Button>
          <p className="text-center text-xs text-gray-400 mt-3">
            🔒 Paiement sécurisé par Stripe • Aucune donnée de carte stockée
          </p>
        </div>
      </motion.div>

      {/* Boutons d’édition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }} className="max-w-3xl mx-auto"
      >
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">📝 Besoin de modifier quelque chose ?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button onClick={() => navigation.goToStep(1)} className="flex items-center gap-2 p-3 rounded-lg border border-white/10 hover:border-white/20 transition-colors text-sm text-gray-300 hover:text-white">
              <Building2 className="w-4 h-4" />
              <span>Organisme</span>
            </button>
            <button onClick={() => navigation.goToStep(2)} className="flex items-center gap-2 p-3 rounded-lg border border-white/10 hover:border-white/20 transition-colors text-sm text-gray-300 hover:text-white">
              <FileText className="w-4 h-4" />
              <span>Problème</span>
            </button>
            <button onClick={() => navigation.goToStep(3)} className="flex items-center gap-2 p-3 rounded-lg border border-white/10 hover:border-white/20 transition-colors text-sm text-gray-300 hover:text-white">
              <MessageSquare className="w-4 h-4" />
              <span>Détails</span>
            </button>
            <button onClick={() => navigation.goToStep(4)} className="flex items-center gap-2 p-3 rounded-lg border border-white/10 hover:border-white/20 transition-colors text-sm text-gray-300 hover:text-white">
              <User className="w-4 h-4" />
              <span>Coordonnées</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ReviewStep
