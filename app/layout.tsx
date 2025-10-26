import type { Metadata } from "next";
import "./globals.css";
import Header  from "../components/Header";
import Footer  from "../components/Footer";
import {ClerkProvider} from  "@clerk/nextjs";



export const metadata: Metadata = {
  title: "Boutique",
  description: "Votre boutique en ligne ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

