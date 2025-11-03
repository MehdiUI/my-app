import Container from "@/components/Container";
import Title from "@/components/Title";

export default function PrivacyPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>Privacy Policy</Title>
        <div className="max-w-4xl mx-auto mt-8 space-y-8 text-gray-700">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">1. Information Collection</h2>
            <p>
              We collect information you provide when you create an account, place an order, 
              subscribe to our newsletter, or contact us. This information may include your name, 
              email address, mailing address, phone number, etc.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">2. Use of Information</h2>
            <p>
              The information we collect may be used to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personalize your experience and meet your individual needs</li>
              <li>Improve our website and customer service</li>
              <li>Process your transactions</li>
              <li>Send promotional emails</li>
              <li>Improve our customer service</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">3. Information Protection</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal 
              information. We use state-of-the-art encryption to protect sensitive information 
              transmitted online.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">4. Third-Party Sharing</h2>
            <p>
              We do not sell, trade, or transfer your personally identifiable information to 
              third parties. This does not include trusted third parties who assist us in operating 
              our website or conducting our business.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}