import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accord de Traitement des Données (DPA) | LegalRecours",
  description: "Contrat de sous-traitance des données personnelles (article 28 RGPD).",
};

export default function DpaPage() {
  return (
    <main className="container-custom py-10">
      <article className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold">Accord de Traitement des Données (DPA)</h1>
          <p className="text-muted">Dernière mise à jour : 19 août 2025</p>
        </header>

        <section>
          <p>
            Le présent Accord de Traitement (« DPA ») fait partie intégrante des conditions contractuelles entre
            LegalRecours (« Sous-traitant ») et le Client (« Responsable de traitement ») au sens de l’article 28 RGPD.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">1. Objet</h2>
          <p>Définir les conditions dans lesquelles LegalRecours traite des données personnelles pour le compte du Client.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Description des traitements</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nature : hébergement, génération/envoi de documents, support client.</li>
            <li>Finalité : exécution des Services définis au contrat.</li>
            <li>Catégories de données : identité, contact, données liées aux démarches.</li>
            <li>Durée : durée du contrat + obligations légales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Obligations du Sous-traitant</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Traiter uniquement sur instruction documentée du Client.</li>
            <li>Confidentialité du personnel autorisé.</li>
            <li>Mesures de sécurité appropriées (techniques et organisationnelles).</li>
            <li>Assistance au Client pour l’exercice des droits et la sécurité.</li>
            <li>Notification sans délai injustifié en cas de violation de données.</li>
            <li>Tenue d’un registre des catégories d’activités de traitement.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Sous-traitance ultérieure</h2>
          <p>
            LegalRecours peut recourir à des sous-traitants listés au contrat ou notifiés au Client. Ils sont soumis à
            des obligations équivalentes au présent DPA. Le Client est informé de tout changement significatif.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Transferts hors UE</h2>
          <p>Encadrés par des garanties appropriées (SCC/Clauses contractuelles types, pays adéquats) et information du Client.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Audits</h2>
          <p>
            Le Client peut diligenter un audit raisonnable, sur préavis écrit, sans perturber excessivement
            l’exploitation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Issue du contrat</h2>
          <p>Restitution ou suppression des données au choix du Client, sauf obligation légale de conservation.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Hiérarchie contractuelle</h2>
          <p>
            En cas de conflit, le DPA prévaut sur des stipulations contraires des CGU pour les aspects « protection des
            données ».
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Contact</h2>
          <p>
            Contact :{" "}
            <a className="underline" href="mailto:contact@legalrecours.fr">
              contact@legalrecours.fr
            </a>
          </p>
        </section>
      </article>
    </main>
  );
}
