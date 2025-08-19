// app/(legal)/layout.tsx
import React from "react"


export default function LegalLayout({ children }: { children: React.ReactNode }) {
return (
<main className="container-custom py-12">
<div className="mx-auto max-w-3xl">
{children}
</div>
</main>
)
}