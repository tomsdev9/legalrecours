// app/api/download/[id]/route.ts
import { getPdf } from "@/lib/storage"

export const runtime = "nodejs"

export async function GET(req: Request, context: unknown) {
  const { params } = context as { params: { id: string } }

  const buf = await getPdf(params.id)
  if (!buf) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    })
  }

  // 1) Normalise en Uint8Array
  const u8 = buf instanceof Uint8Array ? new Uint8Array(buf) : new Uint8Array(buf as ArrayBufferLike)

  // 2) Construit un Blob pour que BodyInit soit accepté partout
  const blob = new Blob([u8], { type: "application/pdf" })

  return new Response(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="courrier-${params.id}.pdf"`,
      "Cache-Control": "no-store",
    },
  })
}
