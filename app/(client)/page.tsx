import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";


import React from "react";

const Home = async () => {

  return (
    <Container>
      <HomeBanner />
      <ProductGrid />
      
      
    </Container>
    
  );
};

export default Home;