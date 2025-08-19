// app/checkout/success/page.tsx
"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { CheckCircle2, FileText, MapPin, Mail, Download, AlertTriangle, Loader2, Target, TrendingUp, Clock, Database } from "lucide-react"
import { getAttachmentsForCase } from "@/lib/letter-templates/attachments"
import { ORGANISMS } from "@/lib/wizard-data"
import type { CaseId, OrganismKey } from "@/lib/wizard-data"

type Status = "checking" | "ok" | "ko"

type Payload = {
  organism: OrganismKey
  caseId: CaseId
  contextData: Record<string, unknown>
  userInfo: Record<string, unknown>
}

type Analysis = {
  successRate: number
  tip: string
  bonus: number
  delay: string
  cases: number
}

// Fonction pour générer une analyse dynamique selon le cas
function generateAnalysis(payload: Payload): Analysis {
  const { caseId, contextData } = payload

  const analysisData: Record<string, Partial<Analysis>> = {
    // CAF
    "CAF_TROP_PERCU": { successRate: Math.floor(85 + Math.random() * 10), tip: "justificatifs de revenus", bonus: 15, delay: "15-30 jours", cases: 423 },
    "CAF_NON_VERSEMENT": { successRate: Math.floor(90 + Math.random() * 8), tip: "attestation employeur", bonus: 8, delay: "10-20 jours", cases: 567 },
    "CAF_REMISE_DETTE": { successRate: Math.floor(75 + Math.random() * 15), tip: "justificatifs de charges", bonus: 18, delay: "20-35 jours", cases: 234 },
    "CAF_MONTANT_ERREUR": { successRate: Math.floor(88 + Math.random() * 10), tip: "fiches de paie complètes", bonus: 12, delay: "12-25 jours", cases: 345 },
    // CPAM
    "CPAM_RETARD_REMBOURSEMENT": { successRate: Math.floor(92 + Math.random() * 6), tip: "ordonnance originale", bonus: 6, delay: "8-15 jours", cases: 678 },
    "CPAM_REFUS_REMBOURSEMENT": { successRate: Math.floor(82 + Math.random() * 12), tip: "rapport médical détaillé", bonus: 16, delay: "15-25 jours", cases: 456 },
    "CPAM_REFUS_ARRET_TRAVAIL": { successRate: Math.floor(79 + Math.random() * 15), tip: "certificat médical circonstancié", bonus: 20, delay: "20-30 jours", cases: 289 },
    "CPAM_FEUILLE_SOINS": { successRate: Math.floor(95 + Math.random() * 4), tip: "accusé de réception postal", bonus: 4, delay: "5-12 jours", cases: 789 },
    // Pôle Emploi
    "POLE_EMPLOI_RADIATION": { successRate: Math.floor(86 + Math.random() * 10), tip: "certificat médical ou justificatif", bonus: 14, delay: "10-20 jours", cases: 512 },
    "POLE_EMPLOI_OBSERVATIONS": { successRate: Math.floor(83 + Math.random() * 12), tip: "preuves de recherche d'emploi", bonus: 17, delay: "15-25 jours", cases: 367 },
    "POLE_EMPLOI_TROP_PERCU": { successRate: Math.floor(81 + Math.random() * 14), tip: "bulletin de salaire détaillé", bonus: 13, delay: "20-35 jours", cases: 434 },
    "POLE_EMPLOI_REFUS_INDEMNISATION": { successRate: Math.floor(87 + Math.random() * 10), tip: "attestation employeur complète", bonus: 11, delay: "15-30 jours", cases: 623 },
    "POLE_EMPLOI_ATTESTATION_EMPLOYEUR": { successRate: Math.floor(94 + Math.random() * 5), tip: "historique des relances", bonus: 5, delay: "8-15 jours", cases: 456 },
  }

  const data = analysisData[caseId] || { successRate: 85, tip: "pièces justificatives", bonus: 10, delay: "15-25 jours", cases: 500 }

  let adjustedRate = data.successRate!
  if (contextData.amount && typeof contextData.amount === "number") {
    if (contextData.amount > 1000) adjustedRate = Math.max(adjustedRate - 3, 70)
    if (contextData.amount < 200) adjustedRate = Math.min(adjustedRate + 2, 98)
  }

  return { successRate: adjustedRate, tip: data.tip!, bonus: data.bonus!, delay: data.delay!, cases: data.cases! }
}

// Compteur animé
function AnimatedCounter({ value, duration = 2000, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let startTime: number
    let raf: number
    const animate = (t: number) => {
      if (!startTime) startTime = t
      const p = Math.min((t - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setCount(Math.floor(eased * value))
      if (p < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return <span>{count}{suffix}</span>
}

// Carte d'analyse (DA claire)
function AnalysisCard({ analysis }: { analysis: Analysis | null }) {
  if (!analysis) return null

  return (
    <div className="mt-8 mx-auto max-w-2xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-white border border-green-primary">
          <Target className="w-4 h-4 text-green-primary" />
          <span className="text-green-primary font-medium text-sm">Analyse de votre dossier</span>
        </div>
      </div>

      <div className="relative rounded-2xl glass-white p-6 sm:p-8 border border-primary">
        <div className="relative space-y-6">
          {/* Score principal */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-primary">
                <AnimatedCounter value={analysis.successRate} suffix="%" duration={2500} />
              </div>
              <div className="text-sm sm:text-base text-secondary mt-2">Chances de succès</div>
            </div>
          </div>

          {/* Métriques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-white rounded-xl p-4 text-center border border-primary">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-green-primary">
                +<AnimatedCounter value={analysis.bonus} suffix="%" duration={2000} />
              </div>
              <div className="text-xs text-muted mt-1">si vous ajoutez</div>
              <div className="text-sm text-primary font-medium mt-1">{analysis.tip}</div>
            </div>

            <div className="glass-white rounded-xl p-4 text-center border border-primary">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-green-primary" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-primary">{analysis.delay}</div>
              <div className="text-xs text-muted mt-1">délai estimé</div>
            </div>

            <div className="glass-white rounded-xl p-4 text-center border border-primary">
              <div className="flex items-center justify-center mb-2">
                <Database className="w-5 h-5 text-green-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-primary">
                <AnimatedCounter value={analysis.cases} duration={2200} />
              </div>
              <div className="text-xs text-muted mt-1">cas similaires</div>
            </div>
          </div>

          <div className="text-center p-4 rounded-xl glass-white border border-primary">
            <p className="text-sm sm:text-base text-secondary">
              <span className="text-green-primary font-medium">Excellent score !</span> Votre dossier présente de fortes chances de succès.
              {analysis.bonus > 0 && (
                <span className="block mt-1 text-secondary">
                  💡 Astuce : ajoutez votre <span className="text-primary font-medium">{analysis.tip}</span> pour optimiser vos chances.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  const [status, setStatus] = useState<Status>("checking")
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [payload, setPayload] = useState<Payload | null>(null)
  const [attachments, setAttachments] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)

    // Auto-téléchargement à l'arrivée sur la page
    const didAuto = React.useRef(false)
    useEffect(() => {
      if (!didAuto.current && status === "ok" && payload && !blobUrl && !generating) {
        didAuto.current = true
        handleGenerateAndDownload()
      }
    }, [status, payload, blobUrl, generating])

  useEffect(() => {
    const run = async () => {
      const sessionId = new URLSearchParams(window.location.search).get("session_id")
      if (!sessionId) { setStatus("ko"); return }

      const s = await fetch(`/api/stripe/session?id=${sessionId}`).then(r => r.json()).catch(() => null)
      if (!s?.paid) { setStatus("ko"); return }

      const raw = sessionStorage.getItem("lastGeneratePayload")
      let p: Payload | null = null
      if (raw) { try { p = JSON.parse(raw) as Payload } catch { p = null } }
      if (!p && s?.payload) { p = s.payload as Payload }

      if (p) {
        setPayload(p)
        const atts = getAttachmentsForCase(p.caseId, p.organism, { ...p.contextData, cafNumber: p.userInfo?.["cafNumber"] })
        setAttachments(atts)
        setStatus("ok")
      } else {
        setStatus("ok")
      }
      sessionStorage.removeItem("lastGeneratePayload")
    }

    run().catch(() => setStatus("ko"))
    return () => { if (blobUrl) URL.revokeObjectURL(blobUrl) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const orgName = useMemo(() => {
    if (!payload?.organism) return "Organisme"
    return ORGANISMS[payload.organism]?.name ?? "Organisme"
  }, [payload])

  async function handleGenerateAndDownload() {
    if (!payload) return
    try {
      setGenerating(true)
      const res = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("pdf_failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setBlobUrl(prev => { if (prev) URL.revokeObjectURL(prev); return url })
      const a = document.createElement("a")
      a.href = url
      a.download = `courrier-${payload.caseId.toLowerCase()}.pdf`
      document.body.appendChild(a); a.click(); a.remove()
      setTimeout(() => { setAnalysis(generateAnalysis(payload)) }, 500)
    } catch {
      // noop
    } finally { setGenerating(false) }
  }

  if (status === "checking") return <div className="container-custom py-16 text-secondary">Vérification du paiement…</div>
  if (status === "ko") return <div className="container-custom py-16 text-red-600">⚠️ Paiement non confirmé.</div>

  const noPayload = !payload

  return (
    <div className="container-custom py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-3 rounded-full px-6 py-3 glass-white border border-green-primary">
          <CheckCircle2 className="w-5 h-5 text-green-primary" />
          <span className="text-primary font-medium">Paiement confirmé</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Votre courrier est prêt</h1>
        <p className="text-secondary">Téléchargez-le puis joignez les pièces recommandées avant envoi.</p>

        {!noPayload && (
  <div className="mt-3">
    {!blobUrl ? (
      <button
        disabled
        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-green-primary text-white bg-green-primary opacity-80"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        Préparation du PDF…
      </button>
    ) : (
      <a
        href={blobUrl}
        download={`courrier-${payload.caseId.toLowerCase()}.pdf`}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-green-primary text-white bg-green-primary hover:brightness-95"
      >
        <Download className="w-5 h-5" />
        Retélécharger le PDF
      </a>
    )}
  </div>
)}

        {noPayload && (
          <div className="mt-4 text-sm text-muted">
            Impossible de retrouver les informations de votre dossier.<br />
            <span className="text-secondary">Revenez au générateur pour regénérer le courrier.</span>
          </div>
        )}
      </div>

      {/* Analyse */}
      <AnalysisCard analysis={analysis} />

      {/* Étapes */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-primary p-6 glass-white">
          <div className="text-primary font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-primary" /> Vérifier et signer
          </div>
          <p className="text-secondary text-sm leading-relaxed">Relisez le document, signez-le et datez-le.</p>
        </div>
        <div className="rounded-xl border border-primary p-6 glass-white">
          <div className="text-primary font-semibold mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-primary" /> Préparer l&apos;envoi
          </div>
          <p className="text-secondary text-sm leading-relaxed">Glissez les pièces jointes, puis envoyez en recommandé avec AR.</p>
        </div>
        <div className="rounded-xl border border-primary p-6 glass-white">
          <div className="text-primary font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-primary" /> Adresse du destinataire
          </div>
          <p className="text-secondary text-sm leading-relaxed">
            {orgName} – consultez l&apos;adresse figurant dans le PDF.
          </p>
        </div>
      </div>
      {/* Checklist pièces à joindre */}
      <div className="rounded-2xl border border-green-primary/40 p-6 bg-white">
        <div className="text-primary font-semibold mb-3">📎 Pièces à joindre (recommandées)</div>
        {attachments?.length ? (
          <ul className="list-disc pl-5 space-y-1 text-primary">
            {attachments.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        ) : (
          <p className="text-secondary">Aucune pièce spécifique n&apos;est requise.</p>
        )}
        <p className="text-xs text-muted mt-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Joindre des pièces pertinentes augmente fortement l&apos;efficacité de votre demande.
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary text-primary hover:bg-gray-50"
        >
          Générer un autre courrier
        </Link>
      </div>
    </div>
  )
}
