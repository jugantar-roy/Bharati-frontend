"use client";

import { useQuery } from "@tanstack/react-query";
import HeroVideo from "@/components/home/HeroVideo";
import CategoryScroller from "@/components/home/CategoryScroller";
import ProductGrid from "@/components/product/ProductGrid";
import TrustBadges from "@/components/home/TrustBadges";
import ReviewCarousel from "@/components/home/ReviewCarousel";
import { getCategories } from "@/lib/api/categories";
import { getFeaturedProducts, getBestSellers } from "@/lib/api/products";

export default function Home() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: featured } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts,
  });

  const { data: bestSellers } = useQuery({
    queryKey: ['products', 'best-sellers'],
    queryFn: getBestSellers,
  });

  return (
    <div className="flex flex-col w-full">
      <HeroVideo />
      
      {categories && categories.length > 0 && (
        <CategoryScroller categories={categories} />
      )}

      {featured && featured.length > 0 && (
        <ProductGrid 
          id="featured"
          title="Featured Collection" 
          subtitle="Hand-picked essentials for your kitchen."
          products={featured} 
        />
      )}

      <TrustBadges />

      {bestSellers && bestSellers.length > 0 && (
        <ProductGrid 
          title="Best Sellers" 
          subtitle="Our most popular products, loved by thousands."
          products={bestSellers} 
        />
      )}

      <ReviewCarousel />
    </div>
  );
}
