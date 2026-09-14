"use client";

import Link from "next/link";
import { ProductCard as ProductCardType } from "@/types/catalog";
import { useCartStore } from "@/lib/stores/cart-store";
import { useDrawerStore } from "@/lib/stores/drawer-store";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductCard({ product }: { product: ProductCardType }) {
  const addItem = useCartStore((state) => state.addItem);
  const { openCart } = useDrawerStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      title: product.title,
      price: product.discountedPrice || product.basePrice,
      quantity: 1,
      imageUrl: product.primaryImageUrl,
      slug: product.slug,
      sku: "SKU-TBD", // Placeholder until backend variant logic is wired in cart
    });
    openCart();
  };

  // Fallback image if none provided
  const imageUrl = product.primaryImageUrl || "https://images.unsplash.com/photo-1584990347449-a6fb1f48e2df?auto=format&fit=crop&q=80&w=600";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col bg-background rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.badges?.map((badge, idx) => (
          <span key={idx} className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded shadow-sm">
            {badge}
          </span>
        ))}
        {!product.inStock && (
          <span className="bg-black/80 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-muted">
        <motion.img 
          src={imageUrl} 
          alt={product.title}
          className="object-cover w-full h-full"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${product.slug}`} className="group-hover:text-primary transition-colors">
          <h3 className="font-serif text-lg font-bold leading-tight mb-1 line-clamp-2">{product.title}</h3>
        </Link>
        
        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex flex-col">
            {product.discountedPrice < product.basePrice ? (
              <>
                <span className="text-sm text-muted-foreground line-through">₹{product.basePrice.toLocaleString()}</span>
                <span className="text-lg font-bold text-primary">₹{product.discountedPrice.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-foreground">₹{product.basePrice.toLocaleString()}</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`p-3 rounded-full flex items-center justify-center transition-all ${
              product.inStock 
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 active:scale-95 shadow-md" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
