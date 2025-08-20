// app/page.tsx (ou la page Home)
import Hero from "@/components/landing/Hero"
import CasesCovered from "@/components/landing/CasesCovered" // ⟵ AJOUT
import Features from "@/components/landing/Features"
import Testimonials from "@/components/landing/Testimonials"
import Pricing from "@/components/landing/Pricing"
import FAQ from "@/components/landing/FAQ"

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <CasesCovered />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
    </div>
  )
}
