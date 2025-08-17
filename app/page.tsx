import Hero from "@/components/landing/Hero"
import HowItWorks from "@/components/landing/HowItWorks"
import Features from "@/components/landing/Features"
import Testimonials from "@/components/landing/Testimonials"
import Pricing from "@/components/landing/Pricing"
import FAQ from "@/components/landing/FAQ"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Features */}
      <Features />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Pricing */}
      <Pricing />
      
      {/* FAQ */}
      <FAQ />
    </div>
  )
}