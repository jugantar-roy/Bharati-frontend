"use client";

import Link from "next/link";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { useDrawerStore } from "@/lib/stores/drawer-store";
import { useCartStore } from "@/lib/stores/cart-store";
import { useEffect, useState } from "react";

export default function Header() {
  const { openNav, openCart } = useDrawerStore();
  const { itemCount } = useCartStore();
  
  // Prevent hydration mismatch for zustand persisted store
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={openNav}
              className="p-2 -ml-2 text-foreground hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center gap-2">
              {/* Optional: Add Logo Image here later */}
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                Bharati
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/category/pressure-cooker" className="text-sm font-medium hover:text-primary transition-colors">Pressure Cookers</Link>
            <Link href="/category/kadhai" className="text-sm font-medium hover:text-primary transition-colors">Kadhais</Link>
            <Link href="/category/saucepan" className="text-sm font-medium hover:text-primary transition-colors">Saucepans</Link>
            <Link href="/category/thali-set" className="text-sm font-medium hover:text-primary transition-colors">Thali Sets</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center justify-end flex-1 lg:flex-none gap-2 sm:gap-4">
            <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <Link href="/account" className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Account">
              <User size={20} />
            </Link>
            <button 
              onClick={openCart}
              className="p-2 text-foreground hover:text-primary transition-colors relative" 
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {mounted && itemCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
