import type { Metadata } from "next";
import "./globals.css";
import Header  from "../components/Header";
import Footer  from "../components/Footer";



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
    <html lang="en">
      <body className="font-poppins antialiased"> <Header /> {children} <Footer /></body>
      
    </html>
  );
}
