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

  // ✅ Conversion en Buffer pour TypeScript
  const buffer = Buffer.from(buf)

  // ✅ Response accepte Buffer
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="courrier-${params.id}.pdf"`,
      "Cache-Control": "no-store",
    },
  })
}