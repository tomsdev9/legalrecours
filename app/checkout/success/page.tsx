"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, FileText, MapPin, Mail, Download, AlertTriangle } from "lucide-react"
import { getAttachmentsForCase } from "@/lib/letter-templates/attachments"
import { ORGANISMS, type CaseId, type OrganismKey } from "@/lib/wizard-data"

type Status = "checking" | "ok" | "ko"

export default function SuccessPage() {
  const [status, setStatus] = useState<Status>("checking")
  const [meta, setMeta] = useState<{
    organism?: OrganismKey
    caseId?: CaseId
    attachments?: string[]
  }>({})

  useEffect(() => {
    const run = async () => {
      const sessionId = new URLSearchParams(window.location.search).get("session_id")
      if (!sessionId) return setStatus("ko")

      // 1) vérifier paiement
      const s = await fetch(`/api/stripe/session?id=${sessionId}`).then(r => r.json()).catch(() => null)
      if (!s?.paid) return setStatus("ko")

      // 2) payload sauvegardé
      const raw = sessionStorage.getItem("lastGeneratePayload")
      if (!raw) { setStatus("ok"); return }
      const payload = JSON.parse(raw) as {
        organism: OrganismKey, caseId: CaseId,
        contextData: Record<string, unknown>,
        userInfo: Record<string, unknown>,
      }

      // 3) Générer PDF final
      const pdfRes = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (pdfRes.ok) {
        const blob = await pdfRes.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `courrier-${payload.caseId.toLowerCase()}.pdf`
        document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
      }

      // 4) Checklist locale (au cas où)
      const attachments = getAttachmentsForCase(payload.caseId, payload.organism, {
        ...payload.contextData,
        cafNumber: payload.userInfo["cafNumber"],
      })
      setMeta({ organism: payload.organism, caseId: payload.caseId, attachments })
      setStatus("ok")
      sessionStorage.removeItem("lastGeneratePayload")
    }
    run().catch(() => setStatus("ko"))
  }, [])

  const org = meta.organism ? ORGANISMS[meta.organism] : undefined

  if (status === "checking") return <div className="container-custom py-16">Vérification du paiement…</div>
  if (status === "ko") return <div className="container-custom py-16 text-red-400">⚠️ Paiement non confirmé.</div>

  return (
    <div className="container-custom py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-3 rounded-full px-6 py-3 bg-green-500/10 border border-green-500/30">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-white font-medium">Paiement confirmé</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Votre PDF a été téléchargé</h1>
        <p className="text-gray-300">Suivez les étapes ci-dessous pour maximiser vos chances de succès.</p>
      </div>

      {/* Étapes */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/10 p-6 bg-white/5">
          <div className="text-white font-semibold mb-2 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-400" /> Vérifier et signer</div>
          <p className="text-gray-300 text-sm leading-relaxed">Relisez le document, signez-le et datez-le.</p>
        </div>
        <div className="rounded-xl border border-white/10 p-6 bg-white/5">
          <div className="text-white font-semibold mb-2 flex items-center gap-2"><Mail className="w-5 h-5 text-purple-400" /> Préparer l’envoi</div>
          <p className="text-gray-300 text-sm leading-relaxed">Glissez les pièces jointes, puis envoyez en recommandé avec AR.</p>
        </div>
        <div className="rounded-xl border border-white/10 p-6 bg-white/5">
          <div className="text-white font-semibold mb-2 flex items-center gap-2"><MapPin className="w-5 h-5 text-emerald-400" /> Adresse du destinataire</div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {org ? org.name : "Organisme"} – consultez l’adresse figurant dans le PDF.
          </p>
        </div>
      </div>

      {/* Checklist pièces à joindre */}
      <div className="rounded-2xl border border-blue-500/30 p-6 bg-blue-500/10">
        <div className="text-white font-semibold mb-3">📎 Pièces à joindre (recommandées)</div>
        {meta.attachments?.length ? (
          <ul className="list-disc pl-5 space-y-1 text-gray-100">
            {meta.attachments.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        ) : (
          <p className="text-gray-300">Aucune pièce spécifique n’est requise.</p>
        )}
        <p className="text-xs text-gray-400 mt-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Joindre des pièces pertinentes augmente fortement l’efficacité de votre demande.
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white"
        >
          <Download className="w-5 h-5" />
          Générer un autre courrier
        </Link>
      </div>
    </div>
  )
}
