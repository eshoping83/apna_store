"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-rose-600 hover:text-rose-700 transition"
        >
          ApnaStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link href="/" className="hover:text-rose-600 transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-rose-600 transition">
            Products
          </Link>
          <Link href="/services" className="hover:text-rose-600 transition">
            Services
          </Link>
          <Link href="/about" className="hover:text-rose-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-rose-600 transition">
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg animate-slideIn">
          <div className="flex flex-col space-y-4 px-6 py-4 font-medium">
            <Link
              href="/"
              className="hover:text-rose-600 transition"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-rose-600 transition"
              onClick={() => setOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/services"
              className="hover:text-rose-600 transition"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="hover:text-rose-600 transition"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-rose-600 transition"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
