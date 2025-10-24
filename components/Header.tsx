import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  return (
    <header className="bg-white py-5 border-b border-b-black/20 ">
      <Container className="flex items-center justify-between">
       <Logo />
       <HeaderMenu />
       nav admin

      </Container>
    </header>
  );
}
