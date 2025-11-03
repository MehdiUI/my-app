import Container from "@/components/Container";
import Title from "@/components/Title";

const faqs = [
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nos délais de livraison standard sont de 2 à 5 jours ouvrés. Les livraisons express sont disponibles en 24h pour une majorité de destinations."
  },
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons les cartes de crédit (Visa, MasterCard, American Express), PayPal, et virements bancaires."
  },
  {
    question: "Puis-je modifier ma commande après l'avoir passée ?",
    answer: "Vous pouvez modifier votre commande dans l'heure qui suit la validation. Passé ce délai, veuillez nous contacter au plus vite."
  },
  {
    question: "Quelle est votre politique de retour ?",
    answer: "Nous acceptons les retours sous 30 jours pour tout article non utilisé, dans son emballage d'origine. Les frais de retour sont à votre charge."
  },
  {
    question: "Proposez-vous la livraison internationale ?",
    answer: "Oui, nous livrons dans la plupart des pays. Les frais et délais de livraison varient selon la destination."
  },
  {
    question: "Comment suivre ma commande ?",
    answer: "Un email de confirmation avec un numéro de suivi vous sera envoyé dès l'expédition de votre colis."
  }
];

export default function FAQPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>Foire Aux Questions</Title>
        <div className="max-w-4xl mx-auto mt-8 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}