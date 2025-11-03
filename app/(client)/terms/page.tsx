import Container from "@/components/Container";
import Title from "@/components/Title";

export default function TermsPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>Terms of Service</Title>
        <div className="max-w-4xl mx-auto mt-8 space-y-8 text-gray-700">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by these terms 
              of use, all applicable laws and regulations, and agree that you are responsible for 
              compliance with any applicable local laws.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) 
              on our store&apos;s website for personal, non-commercial transitory viewing only.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">3. Orders and Payments</h2>
            <p>
              All orders placed on our site are subject to our acceptance. We reserve the right to 
              refuse or cancel any order for any reason.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">4. Delivery and Returns</h2>
            <p>
              Delivery times are provided as estimates. We cannot be held responsible for delivery 
              delays beyond our control. Our return policy is detailed in a dedicated section.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">5. Modifications</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these terms at any time. 
              It is your responsibility to check these terms periodically for changes.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}