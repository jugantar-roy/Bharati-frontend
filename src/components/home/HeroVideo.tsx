"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroVideo() {
  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-foreground">
      {/* Optional: Add a real <video autoPlay loop muted playsInline> here */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-foreground to-accent/20 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Kitchenware"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl tracking-tight leading-tight mb-6"
        >
          Elevate Your Culinary <span className="text-primary italic">Heritage</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light"
        >
          Premium ISI-certified pressure cookers and kitchenware crafted for the modern Indian home.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link 
            href="#featured" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(201,147,59,0.4)]"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </div>
  );
}
