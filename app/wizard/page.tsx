import { Metadata } from 'next'
import WizardContainer from '@/components/wizard/WizardContainer'

export const metadata: Metadata = {
  title: 'Assistant IA - Générer votre courrier | LegalRecours.fr',
  description: 'Générez votre courrier de réclamation personnalisé en 2 minutes. CAF, CPAM, France Travail - Conformité juridique garantie.',
  keywords: 'courrier réclamation, CAF, CPAM, France Travail, assistant juridique, IA, droit administratif',
  openGraph: {
    title: 'Générer votre courrier de réclamation | LegalRecours.fr',
    description: 'Assistant IA pour créer des courriers juridiquement corrects en 2 minutes',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://legalrecours.fr/wizard',
  }
}

export default function WizardPage() {
  return (
    <>
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "LegalRecours - Assistant IA Juridique",
            "applicationCategory": "LegalApplication",
            "description": "Générateur de courriers de réclamation administratifs avec IA",
            "offers": {
              "@type": "Offer",
              "price": "7.90",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1247"
            }
          }),
        }}
      />

      {/* Main wizard application */}
      <main className="min-h-screen">
        <WizardContainer />
      </main>
    </>
  )
}