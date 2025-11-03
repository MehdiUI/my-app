import Container from "@/components/Container";
import Title from "@/components/Title";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>Contactez-Nous</Title>
        
        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations de contact */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Nos Coordonnées</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-shop-dark-green mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">support@votreboutique.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-shop-dark-green mt-1" />
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-shop-dark-green mt-1" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p className="text-gray-600">
                    123 Rue du Commerce<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-shop-dark-green mt-1" />
                <div>
                  <h3 className="font-semibold">Horaires d&apos;ouverture</h3>
                  <p className="text-gray-600">
                    Lundi - Vendredi: 9h00 - 18h00<br />
                    Samedi: 10h00 - 17h00<br />
                    Dimanche: Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-shop-dark-green"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-shop-dark-green"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-shop-dark-green"
                  placeholder="Objet de votre message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-shop-dark-green"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-shop-dark-green text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}