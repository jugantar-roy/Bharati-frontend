"use client";

import { useDrawerStore } from "@/lib/stores/drawer-store";
import { X, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavigationDrawer() {
  const { isNavOpen, closeNav } = useDrawerStore();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isNavOpen]);

  return (
    <AnimatePresence>
      {isNavOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNav}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-background z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-serif text-xl font-bold text-primary">Bharati</span>
              <button 
                onClick={closeNav}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-4">
              
              <div className="px-4 mb-6">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Shop Categories</h3>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="h-8 bg-muted rounded animate-pulse w-full"></div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {categories?.map((cat) => (
                      <li key={cat.id}>
                        <Link 
                          href={`/category/${cat.slug}`}
                          onClick={closeNav}
                          className="flex items-center justify-between py-2 text-base font-medium hover:text-primary transition-colors group"
                        >
                          {cat.name}
                          <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="h-px bg-border my-6"></div>

              <div className="px-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Support & Legal</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/track-order" onClick={closeNav} className="block py-2 text-sm text-foreground hover:text-primary">
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" onClick={closeNav} className="block py-2 text-sm text-foreground hover:text-primary">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" onClick={closeNav} className="block py-2 text-sm text-foreground hover:text-primary">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer / Login CTA */}
            <div className="p-4 border-t border-border bg-muted/30">
              <Link 
                href="/account" 
                onClick={closeNav}
                className="flex items-center justify-center gap-2 w-full bg-foreground text-background py-3 px-4 rounded-md font-medium hover:bg-foreground/90 transition-colors"
              >
                <User size={18} />
                Sign In / Register
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
