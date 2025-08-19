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

  // ✅ Force un Uint8Array “pur” (pas Buffer)
  const u8 =
    buf instanceof Uint8Array
      ? new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength) // recrée une vue typée
      : new Uint8Array(buf as ArrayBufferLike)

  // ✅ Response accepte très bien un ArrayBuffer
  const ab = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength)

  return new Response(ab, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="courrier-${params.id}.pdf"`,
      "Cache-Control": "no-store",
    },
  })
}
