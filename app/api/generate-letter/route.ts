// app/api/generate-letter/route.ts
import { NextRequest, NextResponse } from "next/server"
import type { CaseId, OrganismKey } from "@/lib/wizard-data"
import { buildDraftForCase } from "@/lib/letter-templates"
import { subjectForCase } from "@/lib/subject"
import { reviseLetterWithAI, stripProtectionBrackets, sanitizeLetterBody } from "@/lib/ai"
import { renderLetterPdfBuffer } from "@/lib/pdf"

export const runtime = "nodejs"

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
  const n = typeof v === "number" ? v : Number(String(v).replace(/[^\d.,-]/g, "").replace(",", "."))
  if (!isFinite(n)) return undefined
  // “1 200 €” sans décimales si entier
  const base = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: Number.isInteger(n) ? 0 : 2 }).format(n)
  return `${base}\u202F€`
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

    // 5) Lignes “Références”
    const metaLines: string[] = []
    const ref = body.contextData["referenceNumber"]
    if (ref) metaLines.push(`Référence dossier : ${String(ref)}`)

    const amount = fmtEUR(body.contextData["amount"])
    if (amount) metaLines.push(`Montant en litige : ${amount}`)

    const dateRaw = body.contextData["decisionDate"]
    if (dateRaw) {
      // on réaffiche JJ/MM/AAAA si on reçoit 2025-08-08
      const d = new Date(String(dateRaw))
      const ok = !isNaN(d.getTime())
      metaLines.push(`Décision du : ${ok ? d.toLocaleDateString("fr-FR") : String(dateRaw)}`)
    }

    if (body.organism === "CAF" && u.cafNumber) {
      metaLines.push(`N° allocataire : ${u.cafNumber}`)
    }
    if (body.organism === "CPAM" && u.cpamNumber) {
      metaLines.push(`N° sécu : ${u.cpamNumber}`)
    }
    if (body.organism === "POLE_EMPLOI" && u.poleEmploiNumber) {
      metaLines.push(`Identifiant Pôle Emploi : ${u.poleEmploiNumber}`)
    }

    // 👉 Mode preview (on ne renvoie PAS le texte, juste des infos)
    if (body.preview) {
      return NextResponse.json({
        subject,
        // on ne renvoie pas finalText pour éviter la copie
        metaLines,
        destLines,
        dateStr: `À ${u.city}, le ${todayFr()}`,
      })
    }

    // 6) PDF
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

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="courrier-${body.caseId.toLowerCase()}.pdf"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (err) {
    console.error("/api/generate-letter error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
