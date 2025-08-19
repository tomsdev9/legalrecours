// app/api/download/[id]/route.ts
import { NextResponse } from "next/server"
import { getPdf } from "@/lib/storage"

export const runtime = "nodejs"

export async function GET(
  req: Request,
  { params }: any            // 👈 laisse en `any` pour éviter l'erreur Next
) {
  const buf = await getPdf(params.id)
  if (!buf) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="courrier-${params.id}.pdf"`,
      "Cache-Control": "no-store",
    },
  })
}
