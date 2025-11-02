// components/HeaderClient.tsx
"use client";

import React from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import { ClerkLoaded, SignedIn, UserButton, SignInButton } from "@clerk/nextjs"; // Ajoutez SignInButton ici
import Link from "next/link";
import { Logs } from "lucide-react";

interface HeaderClientProps {
  ordersCount: number;
  hasUser: boolean;
}

const HeaderClient = ({ ordersCount, hasUser }: HeaderClientProps) => {
  return (
    <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
      <SearchBar />
      <CartIcon />
      <FavoriteButton />

      {hasUser && (
        <Link
          href={"/orders"}
          className="group relative hover:text-shop-light-green hoverEffect"
        >
          <Logs />
          <span className="absolute -top-1 -right-1 bg-shop-btn-dark-green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {ordersCount}
          </span>
        </Link>
      )}

      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        {!hasUser && (
          <SignInButton mode="modal">
            <button className="text-sm font-semibold hover:text-darkColor text-lightColor hover:cursor-pointer hoverEffect">
              Login
            </button>
          </SignInButton>
        )}
      </ClerkLoaded>
    </div>
  );
};

export default HeaderClient;