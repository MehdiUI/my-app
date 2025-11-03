import Container from "@/components/Container";
import Title from "@/components/Title";

export default function PrivacyPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>Politique de Confidentialité</Title>
        <div className="max-w-4xl mx-auto mt-8 space-y-8 text-gray-700">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">1. Collecte des informations</h2>
            <p>
              Nous collectons les informations que vous nous fournissez lorsque vous créez un compte, 
              passez une commande, vous abonnez à notre newsletter ou nous contactez. Ces informations 
              peuvent inclure votre nom, adresse email, adresse postale, numéro de téléphone, etc.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">2. Utilisation des informations</h2>
            <p>
              Les informations que nous collectons peuvent être utilisées pour :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
              <li>Améliorer notre site web et service client</li>
              <li>Traiter vos transactions</li>
              <li>Vous envoyer des emails promotionnels</li>
              <li>Améliorer notre service client</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">3. Protection des informations</h2>
            <p>
              Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité 
              de vos informations personnelles. Nous utilisons un cryptage de pointe pour protéger 
              les informations sensibles transmises en ligne.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">4. Partage avec des tiers</h2>
            <p>
              Nous ne vendons, n&apos;échangeons ni ne transférons vos informations personnelles 
              identifiables à des tiers. Ceci n&apos;inclut pas les tierces parties de confiance 
              qui nous aident à exploiter notre site web ou à mener nos affaires.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}