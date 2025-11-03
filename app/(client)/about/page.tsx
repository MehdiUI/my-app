import Container from "@/components/Container";
import Title from "@/components/Title";

export default function AboutPage() {
  return (
    <div className="py-10">
      <Container>
        <Title>About Us</Title>
        <div className="max-w-4xl mx-auto mt-8 space-y-6 text-gray-700">
          <p className="text-lg">
            Welcome to our online store, your trusted destination for premium quality products.
          </p>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            <p>
              We are committed to providing our customers with an exceptional shopping experience 
              with carefully selected products, dedicated customer service, and fast, reliable delivery.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Our Story</h2>
            <p>
              Founded in 2024, our company was born from a passion for excellence and innovation. 
              Since our beginnings, we have strived to exceed our customers expectations with every interaction.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Unmatched quality</li>
              <li>Exceptional customer service</li>
              <li>Constant innovation</li>
              <li>Environmental responsibility</li>
              <li>Total transparency</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}