import Container from "@/components/Container";
import Title from "@/components/Title";

export default function TermsPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>Conditions Générales d&apos;Utilisation</Title>
        <div className="max-w-4xl mx-auto mt-8 space-y-8 text-gray-700">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">1. Acceptation des conditions</h2>
            <p>
              En accédant et en utilisant ce site web, vous acceptez d&apos;être lié par ces conditions 
              d&apos;utilisation, toutes les lois et règlements applicables, et convenez que vous êtes 
              responsable du respect des lois locales applicables.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">2. Utilisation de la licence</h2>
            <p>
              Il est permis de télécharger temporairement une copie des documents (informations ou logiciels) 
              sur le site de notre boutique pour un usage personnel et non commercial transitoire uniquement.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">3. Commandes et paiements</h2>
            <p>
              Toutes les commandes passées sur notre site sont soumises à notre acceptation. 
              Nous nous réservons le droit de refuser ou d&apos;annuler toute commande pour quelque raison que ce soit.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">4. Livraison et retours</h2>
            <p>
              Les délais de livraison sont indiqués à titre estimatif. Nous ne pouvons être tenus responsables 
              des retards de livraison indépendants de notre volonté. Notre politique de retour est détaillée 
              dans une section dédiée.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">5. Modifications</h2>
            <p>
              Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer 
              ces conditions à tout moment. Il est de votre responsabilité de vérifier périodiquement 
              les modifications.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}