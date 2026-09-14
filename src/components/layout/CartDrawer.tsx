"use client";

import { useCartStore } from "@/lib/stores/cart-store";
import { useDrawerStore } from "@/lib/stores/drawer-store";
import { X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useDrawerStore();
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCartStore();
  
  // Hydration guard
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-serif text-xl font-bold">Your Cart ({itemCount})</h2>
              <button 
                onClick={closeCart}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Trash2 size={24} className="opacity-50" />
                  </div>
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={closeCart}
                    className="text-primary hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.productId}-${item.variantId || 'base'}`} className="flex gap-4 border-b border-border pb-4">
                    <div className="w-20 h-20 rounded-md bg-muted overflow-hidden shrink-0">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/product/${item.slug}`} onClick={closeCart} className="font-medium line-clamp-2 hover:text-primary transition-colors">
                          {item.title}
                        </Link>
                        <button 
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-muted-foreground hover:text-accent p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="text-muted-foreground text-sm mt-1">{item.sku}</div>
                      
                      <div className="mt-auto flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="font-bold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border bg-muted/30 flex flex-col gap-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link 
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-md font-bold text-center flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-md"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
