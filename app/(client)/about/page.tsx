import Container from "@/components/Container";
import Title from "@/components/Title";

export default function AboutPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>À Propos de Nous</Title>
        <div className="max-w-4xl mx-auto mt-8 space-y-6 text-gray-700">
          <p className="text-lg">
            Bienvenue sur notre boutique en ligne, votre destination de confiance pour 
            des produits de qualité supérieure.
          </p>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Notre Mission</h2>
            <p>
              Nous nous engageons à offrir à nos clients une expérience d&apos;achat exceptionnelle 
              avec des produits soigneusement sélectionnés, un service client dévoué et 
              une livraison rapide et fiable.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Notre Histoire</h2>
            <p>
              Fondée en 2024, notre entreprise est née d&apos;une passion pour l&apos;excellence 
              et l&apos;innovation. Depuis nos débuts, nous nous efforçons de dépasser 
              les attentes de nos clients à chaque interaction.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Nos Valeurs</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Qualité inégalée</li>
              <li>Service client exceptionnel</li>
              <li>Innovation constante</li>
              <li>Responsabilité environnementale</li>
              <li>Transparence totale</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}