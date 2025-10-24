import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";

export default function Header() {
  return (
    <header className="bg-white py-5 border-b border-b-black/20 ">
      <Container className="flex items-center justify-between">
       <Logo />
       <HeaderMenu />
      <div><SearchBar />
      <CartIcon />
      <FavoriteButton /></div>

      </Container>
    </header>
  );
}
