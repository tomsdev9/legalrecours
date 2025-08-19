import { NextResponse } from "next/server"
import { getPdf } from "@/lib/storage"

export async function GET(_: Request, ctx: { params: { id: string } }) {
  const buf = await getPdf(ctx.params.id)
  if (!buf) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="courrier-${ctx.params.id}.pdf"`,
      "Cache-Control": "no-store",
    },
  })
}
