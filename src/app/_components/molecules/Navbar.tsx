import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import Cart from "../atoms/Cart";

// import { Container } from './styles';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-50">
      <Link
        href="/"
        className="uppercase font-bold text-md h-12 flex items-center"
      >
        Next
      </Link>
      <div className="flex items-center gap-8">
        <Cart />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">Login</SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};
