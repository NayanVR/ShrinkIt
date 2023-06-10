"use client";

import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="h-16 w-full border-b border-white">
      <nav className="max-w-screen-2xl mx-auto h-full flex items-center px-4 md:px-8">
        <Image
          className="w-auto h-5"
          src="/full-logo.svg"
          alt="ShrinkIt Logo"
          width={50}
          height={20}
        />
        <button className="group ml-auto bg-white hover:bg-dark text-black hover:text-white hover:border hover:border-primary py-1 px-4 rounded-md transition-all relative">
          <div className="-z-10 absolute top-0 left-0 w-full h-full bg-primary group-hover:blur-md rounded-md transition-all"></div>
          Logout
        </button>
      </nav>
    </div>
  );
}
