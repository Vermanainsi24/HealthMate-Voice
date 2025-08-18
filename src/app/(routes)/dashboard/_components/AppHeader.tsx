"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const menuOptions = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "History", path: "/dashboard/history" },
  { id: 3, name: "Pricing", path: "/dashboard/billing" },
  
];

function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between px-4 py-3 md:py-4">
        
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3">
          <img src="2465196.jpg" alt="HealthMate Voice" className="w-16 h-10" />
          <h1 className="text-lg font-bold md:text-2xl">
            <span className="text-green-600">HealthMate</span>{" "}
            <span className="text-black dark:text-white">Voice</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-8 font-semibold">
            {menuOptions.map(({ id, name, path }) => (
              <li key={id}>
                <Link
                  href={path}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Button + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <UserButton />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 font-semibold">
            {menuOptions.map(({ id, name, path }) => (
              <li key={id}>
                <Link
                  href={path}
                  className="block text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default AppHeader;
