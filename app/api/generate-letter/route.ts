// /app/api/generate-letter/route.ts
import { NextRequest, NextResponse } from "next/server"
import type { CaseId, OrganismKey } from "@/lib/wizard-data"
import { buildDraftForCase } from "@/lib/letter-templates"
import { subjectForCase } from "@/lib/subject"
import { reviseLetterWithAI, stripProtectionBrackets, sanitizeLetterBody } from "@/lib/ai"
import { renderLetterPdfBuffer } from "@/lib/pdf"

export const runtime = "nodejs" // @react-pdf nécessite Node.js

type UserInfo = {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  zipCode: string
  cafNumber?: string
  cpamNumber?: string
  poleEmploiNumber?: string
}

type GenerateBody = {
  organism: OrganismKey
  caseId: CaseId
  contextData: Record<string, string | number | boolean | null | undefined>
  userInfo: UserInfo
  preview?: boolean
}

function todayFr(): string {
  const dt = new Date()
  return dt.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
}

function fmtEUR(v: unknown): string | undefined {
  const n = typeof v === "number" ? v : Number(String(v ?? "").replace(/[^\d.,-]/g, "").replace(",", "."))
  if (!isFinite(n) || n <= 0) return undefined
  const base = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n)
  return `${base} €`
}

// 🚀 NOUVELLE FONCTION : Génère la ligne de montant selon le cas
function getAmountLine(caseId: CaseId, contextData: Record<string, unknown>): string | null {
  const amount = contextData["amount"]
  const expectedAmount = contextData["expectedAmount"] 
  const amountDiff = contextData["amountDiff"]

  switch (caseId) {
    case "CAF_NON_VERSEMENT":
      const expected = fmtEUR(expectedAmount || amount)
      return expected ? `Montant attendu : ${expected}` : null

    case "CAF_TROP_PERCU":
    case "POLE_EMPLOI_TROP_PERCU":
      const trop = fmtEUR(amount)
      return trop ? `Montant du trop-perçu : ${trop}` : null

    case "CAF_REMISE_DETTE":
      const dette = fmtEUR(amount)
      return dette ? `Montant de la dette : ${dette}` : null

    case "CAF_MONTANT_ERREUR":
      const ecart = fmtEUR(amountDiff || amount)
      return ecart ? `Écart constaté : ${ecart}` : null

    case "CPAM_RETARD_REMBOURSEMENT":
    case "CPAM_REFUS_REMBOURSEMENT":
      const rembours = fmtEUR(expectedAmount || amount)
      return rembours ? `Montant attendu : ${rembours}` : null

    case "POLE_EMPLOI_REFUS_INDEMNISATION":
      const indem = fmtEUR(amount)
      return indem ? `Montant concerné : ${indem}` : null

    // Cas sans montant pertinent
    case "CPAM_REFUS_ARRET_TRAVAIL":
    case "CPAM_FEUILLE_SOINS":
    case "POLE_EMPLOI_RADIATION":
    case "POLE_EMPLOI_OBSERVATIONS":
    case "POLE_EMPLOI_ATTESTATION_EMPLOYEUR":
    default:
      return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateBody

    // validations minimales
    if (!body.organism || !body.caseId) {
      return NextResponse.json({ error: "organism et caseId requis" }, { status: 400 })
    }
    const u = body.userInfo
    if (!u?.firstName || !u?.lastName || !u?.address || !u?.city || !u?.zipCode) {
      return NextResponse.json({ error: "userInfo incomplet" }, { status: 400 })
    }

    // 1) Brouillon depuis template
    const { draft, destLines } = buildDraftForCase({
      organism: body.organism,
      caseId: body.caseId,
      context: body.contextData,
      user: body.userInfo,
    })

    // 2) Révision IA
    const revised = await reviseLetterWithAI(draft, {
      organism: body.organism,
      caseId: body.caseId,
    })

    // 3) Nettoyage final
    const finalText = sanitizeLetterBody(stripProtectionBrackets(revised))

    // 4) Objet
    const subject = subjectForCase(body.caseId, body.contextData)

    // 5) 🚀 LIGNES "Références" DYNAMIQUES
    const metaLines: string[] = []
    
    const ref = body.contextData["referenceNumber"]
    if (ref) metaLines.push(`Référence dossier : ${String(ref)}`)

    // 🎯 MONTANT DYNAMIQUE selon le cas
    const amountLine = getAmountLine(body.caseId, body.contextData)
    if (amountLine) metaLines.push(amountLine)

    const dateRaw = body.contextData["decisionDate"]
    if (dateRaw) {
      const d = new Date(String(dateRaw))
      const ok = !isNaN(d.getTime())
      metaLines.push(`Décision du : ${ok ? d.toLocaleDateString("fr-FR") : String(dateRaw)}`)
    }

    if (body.organism === "CAF" && u.cafNumber) {
      metaLines.push(`N° allocataire : ${u.cafNumber}`)
    }
    if (body.organism === "CPAM" && u.cpamNumber) {
      metaLines.push(`N° de Sécurité sociale : ${u.cpamNumber}`)
    }
    if (body.organism === "POLE_EMPLOI" && u.poleEmploiNumber) {
      metaLines.push(`Identifiant France Travail : ${u.poleEmploiNumber}`)
    }

    // 👉 Mode preview : pas de texte renvoyé (anti copie)
    if (body.preview) {
      return NextResponse.json({
        subject,
        metaLines,
        destLines,
        dateStr: `À ${u.city}, le ${todayFr()}`,
      })
    }

    // 6) PDF final
    const pdfBuffer = await renderLetterPdfBuffer({
      sender: {
        firstName: u.firstName,
        lastName: u.lastName,
        address: u.address,
        zipCode: u.zipCode,
        city: u.city,
      },
      destLines,
      dateStr: `À ${u.city}, le ${todayFr()}`,
      subject,
      finalText,
      metaLines,
    })

    // ✅ Fix TypeScript : conversion en Buffer
    return new NextResponse(pdfBuffer as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="courrier-${body.caseId.toLowerCase()}.pdf"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("/api/generate-letter error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}