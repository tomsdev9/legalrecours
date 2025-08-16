import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LegalRecours.fr - Vos droits défendus en 2 minutes',
  description: 'Générez des courriers de réclamation professionnels pour CAF, CPAM, Pôle Emploi. Contestations, remboursements, radiation - Résultats garantis.',
  keywords: 'réclamation CAF, contestation CPAM, radiation Pôle emploi, courrier administratif, IA juridique',
  authors: [{ name: 'LegalRecours' }],
  openGraph: {
    title: 'LegalRecours.fr - Expert en réclamations administratives',
    description: 'Fini la galère administrative ! Générez vos courriers de réclamation en 2 minutes.',
    url: 'https://legalrecours.fr',
    siteName: 'LegalRecours',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LegalRecours - Réclamations administratives'
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LegalRecours.fr - Vos droits défendus',
    description: 'Générez des courriers de réclamation professionnels en 2 minutes',
    images: ['/og-image.jpg'],
    creator: '@legalrecours'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // À remplacer
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        <div className="relative min-h-screen">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          
          {/* Main content */}
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Footer global */}
          <footer className="relative z-10 border-t border-white/10 bg-slate-900/80 backdrop-blur-sm">
            <div className="container-custom py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LR</span>
                  </div>
                  <span className="text-white font-semibold">LegalRecours.fr</span>
                </div>
                
                <div className="flex gap-6 text-sm text-gray-400">
                  <a href="/mentions-legales" className="hover:text-white transition-colors">
                    Mentions légales
                  </a>
                  <a href="/cgv" className="hover:text-white transition-colors">
                    CGV
                  </a>
                  <a href="/confidentialite" className="hover:text-white transition-colors">
                    Confidentialité
                  </a>
                  <a href="mailto:contact@legalrecours.fr" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href="https://www.tiktok.com/@legalrecours" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    TikTok
                  </a>
                  <a 
                    href="https://www.instagram.com/legalrecours" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
                © 2025 LegalRecours.fr - Tous droits réservés | Expert en réclamations administratives
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}