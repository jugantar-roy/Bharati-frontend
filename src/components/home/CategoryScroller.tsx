"use client";

import { CategoryWithCount } from "@/types/catalog";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoryScroller({ categories }: { categories: CategoryWithCount[] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Shop by Category</h2>
      </div>
      
      {/* Hide scrollbar but allow horizontal scroll */}
      <div className="w-full overflow-x-auto pb-8 pt-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory flex gap-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {categories.map((cat, idx) => (
          <Link 
            key={cat.id} 
            href={`/category/${cat.slug}`}
            className="snap-start shrink-0 group block"
          >
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center gap-4 w-[160px] md:w-[200px]"
            >
              <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden bg-muted border-4 border-transparent group-hover:border-primary transition-all duration-300 shadow-md">
                {/* Fallback image per category based on name (simulated) */}
                <img 
                  src={`https://images.unsplash.com/photo-1584990347449-a6fb1f48e2df?auto=format&fit=crop&q=80&w=400&text=${cat.slug}`} 
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-medium text-lg text-foreground group-hover:text-primary transition-colors text-center">
                {cat.name}
              </h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
