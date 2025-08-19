import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d’utilisation | LegalRecours",
  description: "Conditions générales d’utilisation du site legalrecours.fr.",
};

export default function TermsPage() {
  return (
    <main className="container-custom py-10">
      <article className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold">Conditions d’utilisation</h1>
          <p className="text-muted">Dernière mise à jour : 19 août 2025</p>
        </header>

        <section>
          <h2 className="text-xl font-semibold">1. Objet</h2>
          <p>
            Les présentes Conditions d’utilisation (« CGU ») encadrent l’accès et l’usage du site
            <strong> legalrecours.fr</strong> (« le Site »). En accédant au Site, vous acceptez les CGU.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Éditeur du Site</h2>
          <p>
            LegalRecours — {/* Remplacez ci-dessous par vos infos légales */}
            — Email : {`{contact@legalrecours.fr}`}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Services</h2>
          <p>
            Le Site propose un assistant pour générer des courriers et démarches administratives. Les contenus sont
            fournis à titre informatif et ne constituent pas un conseil juridique. Pour tout avis juridique, contactez
            un professionnel du droit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Compte & sécurité</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vous êtes responsable de la confidentialité de vos identifiants.</li>
            <li>Prévenez l’éditeur en cas d’utilisation non autorisée de votre compte.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Usage autorisé</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ne pas détourner les Services ni porter atteinte aux droits des tiers.</li>
            <li>Ne pas tenter d’accès non autorisé ni perturber le bon fonctionnement du Site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Propriété intellectuelle</h2>
          <p>
            Les contenus, marques, logos et logiciels sont protégés. Toute reproduction, modification ou diffusion est
            interdite sans autorisation écrite préalable, sauf mention contraire.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Données personnelles & cookies</h2>
          <p>
            Le traitement de vos données est décrit dans notre{" "}
            <a className="underline" href="/politique-de-confidentialite">
              Politique de confidentialité
            </a>
            . Les traceurs sont gérés via le bandeau cookies et vos préférences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Responsabilité</h2>
          <p>
            Le Site est fourni « en l’état ». LegalRecours ne garantit pas l’absence d’erreurs ou d’indisponibilités et
            n’est pas responsable des dommages indirects liés à l’usage du Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Liens externes</h2>
          <p>
            Les liens vers des sites tiers sont fournis pour convenance. L’éditeur n’endosse aucune responsabilité
            quant à leurs contenus.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Durée – Résiliation</h2>
          <p>
            Les CGU s’appliquent tant que vous utilisez le Site. L’éditeur peut suspendre/résilier l’accès en cas de
            manquement ou d’usage abusif.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">11. Modifications</h2>
          <p>
            Les CGU peuvent être modifiées à tout moment. La date de mise à jour figure en haut de page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">12. Droit applicable</h2>
          <p>Droit français. À défaut d’accord amiable, compétence des tribunaux du ressort de l’éditeur.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">13. Contact</h2>
          <p>
            Questions : <a className="underline" href="mailto:contact@legalrecours.fr">contact@legalrecours.fr</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
