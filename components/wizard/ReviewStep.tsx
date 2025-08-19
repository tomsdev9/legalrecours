// components/wizard/ReviewStep.tsx
"use client"

import { useMemo, useState } from "react"

import Link from "next/link"
import useWizard from "@/hooks/useWizard"
import { ORGANISMS, type CaseId } from "@/lib/wizard-data"
import { getAttachmentsForCase } from "@/lib/letter-templates/attachments"
import { Button } from "@/components/ui/button"
import { CheckCircle2, FileText, AlertTriangle, Loader2 } from "lucide-react"

// -------- helpers
const fmtEUR = (v: unknown): string | null => {
  const n =
    typeof v === "number"
      ? v
      : Number(String(v ?? "").replace(/[^\d.,-]/g, "").replace(",", "."))
  if (!isFinite(n) || n <= 0) return null
  const base = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n)
  return `${base}\u202F€`
}

const fmtDateFR = (v: unknown): string | null => {
  if (!v) return null
  const d = new Date(String(v))
  return isNaN(d.getTime()) ? String(v) : d.toLocaleDateString("fr-FR")
}

const maskRef = (ref?: string | number | null): string | null => {
  if (!ref) return null
  const s = String(ref)
  if (s.length <= 6) return s
  return `${s.slice(0, Math.min(6, s.length - 3))}···`
}

const maskSecu = (n?: string): string | null => {
  if (!n) return null
  const s = n.replace(/\s+/g, "")
  if (s.length < 6) return "••••"
  return `${s.slice(0, 1)} •• •• •• •• ${s.slice(-2)}`
}

export default function ReviewStep() {
  const { state } = useWizard()
  const [loading, setLoading] = useState(false)

  const org = state.selectedOrganism ? ORGANISMS[state.selectedOrganism] : undefined

  // Lignes “références” lisibles (sans clés techniques)
  const metaLines = useMemo(() => {
    const ctx = state.contextData || {}
    const out: string[] = []

    const ref = maskRef(String(ctx["referenceNumber"] ?? ""))
    if (ref) out.push(`Référence dossier : ${ref}`)

    const amount = fmtEUR(ctx["amount"])
    if (amount) out.push(`Montant en litige : ${amount}`)

    const dec = fmtDateFR(ctx["decisionDate"])
    if (dec) out.push(`Décision du : ${dec}`)

    if (state.selectedOrganism === "CAF" && state.userInfo?.cafNumber) {
      out.push(`N° allocataire : ${maskRef(state.userInfo.cafNumber)}`)
    }
    if (state.selectedOrganism === "CPAM" && state.userInfo?.cpamNumber) {
      out.push(`N° sécu : ${maskSecu(state.userInfo.cpamNumber)}`)
    }
    if (state.selectedOrganism === "POLE_EMPLOI" && state.userInfo?.poleEmploiNumber) {
      out.push(`Identifiant France Travail : ${maskRef(state.userInfo.poleEmploiNumber)}`)
    }

    return out
  }, [state.selectedOrganism, state.contextData, state.userInfo])

  const attachments = useMemo(() => {
    if (!state.selectedCase || !state.selectedOrganism) return []
    return getAttachmentsForCase(state.selectedCase as CaseId, state.selectedOrganism, {
      ...state.contextData,
      cafNumber: state.userInfo?.cafNumber,
    })
  }, [state.selectedCase, state.selectedOrganism, state.contextData, state.userInfo])

  const subject = useMemo(() => {
    return org ? `Courrier à destination de ${org.name}` : "Courrier"
  }, [org])

  const handlePay = async () => {
    try {
      setLoading(true)

      // ✅ payload minimal attendu par l’API /api/checkout
      const payload = {
        organism: state.selectedOrganism!,
        caseId: state.selectedCase!,
        contextData: state.contextData,
        userInfo: state.userInfo,
      }

      // Fallback si l’utilisateur revient sur /success sans metadata (rare) :
      sessionStorage.setItem("lastGeneratePayload", JSON.stringify(payload))

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      })

      if (!res.ok) {
        setLoading(false)
        alert("Paiement indisponible pour le moment.")
        return
      }

      const { url } = (await res.json()) as { url?: string }
      if (!url) {
        setLoading(false)
        alert("Impossible d’ouvrir le paiement.")
        return
      }
      window.location.href = url
    } catch {
      setLoading(false)
      alert("Erreur réseau. Réessayez.")
    }
  }

  if (!state.selectedOrganism || !state.selectedCase) {
    return (
      <div className="text-center text-secondary">
        Sélectionnez d’abord l’organisme et le cas.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="glass-white rounded-2xl p-5 border border-primary">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-primary font-semibold text-lg">{subject}</h2>
            <p className="text-secondary text-sm mt-1">
              Vérifiez vos informations. Le contenu juridique final sera généré après paiement.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-green-primary text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Préparation prête
          </div>
        </div>
      </div>

      {/* Références */}
      {metaLines.length > 0 && (
        <div className="glass-white rounded-2xl p-5 border border-primary">
          <h3 className="text-primary font-medium mb-3">Références</h3>
          <ul className="list-disc pl-5 space-y-1 text-primary">
            {metaLines.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Pièces jointes recommandées */}
      <div className="rounded-2xl border border-green-primary/40 p-5 bg-green-primary/5">
        <div className="text-primary font-medium mb-2">📎 Pièces à joindre</div>
        {attachments.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-primary">
            {attachments.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        ) : (
          <p className="text-secondary">Aucune pièce spécifique n’est requise.</p>
        )}
        <p className="text-xs text-muted mt-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Joindre des pièces pertinentes augmente fortement l’efficacité de votre demande.
        </p>
      </div>

      {/* --- Checklist avant paiement --- */}
      <div className="glass-white rounded-2xl p-5 border border-primary">
        <h3 className="text-primary font-medium mb-3">🧭 Checklist avant paiement</h3>
        <ul className="space-y-2 text-sm text-primary">
          <li>• Noms, adresse et email vérifiés</li>
          <li>• Dates importantes correctes (décision, notifications, délais)</li>
          <li>• Montant en litige exact (si applicable)</li>
          <li>• Références de dossier / identifiants renseignés</li>
          <li>• Pièces justificatives disponibles pour l’envoi</li>
        </ul>
        <p className="text-xs text-muted mt-3">
          Astuce : envoyez en recommandé avec AR et conservez une copie de l’ensemble (courrier + pièces + preuve d’envoi).
        </p>
      </div>

      {/* CTA paiement */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
  <div className="text-xs text-muted">
    En cliquant sur « Payer et générer », votre PDF A4 sera généré automatiquement.
  </div>
  <div className="flex gap-3">
    {/* Bouton Modifier */}
    <Link
      href="/wizard"
      className="px-4 py-2 rounded-xl bg-[#2a2a2a] text-white text-sm hover:bg-[#3a3a3a] transition"
    >
      Modifier
    </Link>

    {/* Bouton Payer */}
    <Button
      onClick={handlePay}
      disabled={loading}
      className="h-10 px-5 rounded-xl bg-[#1C1C1C] text-white hover:bg-black transition"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirection…
        </>
      ) : (
        <>
          <FileText className="mr-2 h-4 w-4" />
          Payer et générer
        </>
      )}
    </Button>
  </div>
</div>

    </div>
  )
}
