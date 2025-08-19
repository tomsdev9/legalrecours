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

  // ✅ Force un Uint8Array “pur” (copie) pour éviter tout union avec Buffer/SharedArrayBuffer
  const u8 = buf instanceof Uint8Array ? new Uint8Array(buf) : new Uint8Array(buf as ArrayBufferLike)

  // ✅ Response accepte Uint8Array directement
  return new Response(u8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="courrier-${params.id}.pdf"`,
      "Cache-Control": "no-store",
    },
  })
}
