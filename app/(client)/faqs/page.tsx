import Container from "@/components/Container";
import Title from "@/components/Title";

const faqs = [
  {
    question: "What are your delivery times?",
    answer: "Our standard delivery times are 2-5 business days. Express delivery is available within 24 hours for most destinations."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers."
  },
  {
    question: "Can I modify my order after placing it?",
    answer: "You can modify your order within one hour of confirmation. After this period, please contact us as soon as possible."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days for any unused item in its original packaging. Return shipping costs are your responsibility."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries. Shipping fees and delivery times vary by destination."
  },
  {
    question: "How can I track my order?",
    answer: "A confirmation email with a tracking number will be sent to you as soon as your package is shipped."
  }
];

export default function FAQPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>Frequently Asked Questions</Title>
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