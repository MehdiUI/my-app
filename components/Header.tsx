// components/Header.tsx
import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import MobileMenu from "./MobileMenu";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getMyOrders } from "@/sanity/queries";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  let user = null;
  let userId = null;
  let orders = null;

  try {
    user = await currentUser();
    const authResult = await auth();
    userId = authResult.userId;
    
    if (userId) {
      orders = await getMyOrders(userId);
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }

  return (
    <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <HeaderClient 
          ordersCount={orders?.length || 0} 
          hasUser={!!user} 
        />
      </Container>
    </header>
  );
};

export default Header;