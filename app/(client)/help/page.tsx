import Container from "@/components/Container";
import Title from "@/components/Title";
import { HelpCircle, Truck, CreditCard, RotateCcw, MessageCircle } from "lucide-react";

const helpSections = [
  {
    icon: Truck,
    title: "Shipping & Delivery",
    description: "Everything about our delivery times, shipping fees, and order tracking."
  },
  {
    icon: CreditCard,
    title: "Payment & Billing",
    description: "Information about accepted payment methods, security, and billing."
  },
  {
    icon: RotateCcw,
    title: "Returns & Refunds",
    description: "How to return an item and our refund policy."
  },
  {
    icon: MessageCircle,
    title: "Customer Service",
    description: "How to contact us and average response time."
  }
];

export default function HelpPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>Help Center</Title>
        
        <div className="max-w-4xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {helpSections.map((section, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <section.icon className="w-8 h-8 text-shop-dark-green" />
                  <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-gray-700">{section.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <HelpCircle className="w-16 h-16 text-shop-dark-green mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our support team is here to help. Contact us and we&apos;ll get back to you as soon as possible.
            </p>
            <a
              href="/contact"
              className="inline-block bg-shop-dark-green text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}