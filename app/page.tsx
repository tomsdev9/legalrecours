import Hero from "@/components/landing/Hero"
// import Features from "@/components/landing/Features"
// import HowItWorks from "@/components/landing/HowItWorks"
// import Testimonials from "@/components/landing/Testimonials"
// import Pricing from "@/components/landing/Pricing"
// import FAQ from "@/components/landing/FAQ"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />
      
      {/* TODO: Ajouter les autres sections */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Plus de sections arrivent...
          </h2>
          <p className="text-gray-300">
            Hero section terminée ! 🚀
          </p>
        </div>
      </div>
    </div>
  )
}