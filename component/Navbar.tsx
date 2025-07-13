"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ToggleButton from "./theme/ToggleButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/30 dark:bg-gray-800/30 
      backdrop-blur-md shadow-md transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link 
          href="/"
          className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 
            hover:scale-105 transform transition-transform duration-300"
        >
          Smart Waste Tracker
        </Link>

        <div className="flex items-center space-x-4">
          {/* 🆕 Dashboard Button */}
          <Link
            href="/dashboard"
            className="text-sm font-medium px-3 py-2 rounded-md 
              text-gray-800 dark:text-gray-100 hover:bg-gray-200 
              dark:hover:bg-gray-700 transition"
          >
            Dashboard
          </Link>

          {/* 🆕 Inventory Button */}
          <Link
            href="/inventory"
            className="text-sm font-medium px-3 py-2 rounded-md 
              text-gray-800 dark:text-gray-100 hover:bg-gray-200 
              dark:hover:bg-gray-700 transition"
          >
            Inventory
          </Link>

          {/* About Button */}
          <Link
            href="/about"
            className="text-sm font-medium px-3 py-2 rounded-md 
              text-gray-800 dark:text-gray-100 hover:bg-gray-200 
              dark:hover:bg-gray-700 transition"
          >
            About
          </Link>

          {/* Toggle Theme */}
          <ToggleButton />

          {/* Auth */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-blue-600 hover:bg-blue-700 text-white 
                px-4 py-2 rounded-lg font-medium shadow 
                transition-all duration-300 hover:scale-105">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
