import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | LegalRecours",
  description: "Comment LegalRecours collecte, utilise et protège vos données.",
};

export default function PrivacyPage() {
  return (
    <main className="container-custom py-10">
      <article className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
          <p className="text-muted">Dernière mise à jour : 19 août 2025</p>
        </header>

        <section>
          <h2 className="text-xl font-semibold">1. Responsable de traitement</h2>
          <p>
            LegalRecours — Contact :{" "}
            <a className="underline" href="mailto:contact@legalrecours.fr">
              contact@legalrecours.fr
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Données collectées</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Identité et contact (nom, email…).</li>
            <li>Données liées aux démarches et documents générés.</li>
            <li>Données techniques d’usage (logs, navigateur) et cookies selon votre consentement.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Finalités & bases légales</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fourniture des Services (exécution du contrat).</li>
            <li>Support & sécurité (intérêt légitime).</li>
            <li>Mesure d’audience (consentement, si non exemptée CNIL).</li>
            <li>Prospection (consentement, désinscription possible à tout moment).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Durées de conservation</h2>
          <p>
            Conservation le temps nécessaire aux finalités, puis archivage/suppression selon les obligations légales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Destinataires</h2>
          <p>
            Personnel habilité de LegalRecours et prestataires (hébergement, email, analytics) soumis à
            confidentialité et, le cas échéant, à un{" "}
            <a className="underline" href="/dpa">
              accord de traitement (DPA)
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Transferts hors UE</h2>
          <p>
            Encadrés par des garanties appropriées (clauses contractuelles types, pays adéquats, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Vos droits RGPD</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accès, rectification, effacement, limitation, opposition, portabilité.</li>
            <li>Retrait du consentement à tout moment.</li>
            <li>Réclamation auprès de la CNIL (www.cnil.fr).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Sécurité</h2>
          <p>Mesures techniques et organisationnelles adaptées (chiffrement en transit, contrôle d’accès, logs).</p>
        </section>

        <section id="cookies">
          <h2 className="text-xl font-semibold">9. Cookies & traceurs</h2>
          <p>
            Catégories : nécessaires (toujours actifs), mesure d’audience, marketing (soumis à consentement).
            Vous pouvez modifier vos choix via le bouton « Gérer mes cookies » (ex. dans le footer).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Contact</h2>
          <p>
            Confidentialité / données personnelles :{" "}
            <a className="underline" href="mailto:contact@legalrecours.fr">
              contact@legalrecours.fr
            </a>
          </p>
        </section>
      </article>
    </main>
  );
}
