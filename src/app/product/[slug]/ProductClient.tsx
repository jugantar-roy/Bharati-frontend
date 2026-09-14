"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductBySlug } from "@/lib/api/products";
import { fetchApi } from "@/lib/api/client";
import { useCartStore } from "@/lib/stores/cart-store";
import { useDrawerStore } from "@/lib/stores/drawer-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useState } from "react";
import { Star, ShoppingCart, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const { addItem } = useCartStore();
  const { openCart } = useDrawerStore();
  const { isAuthenticated } = useAuthStore();
  
  const [activeImage, setActiveImage] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug as string),
    enabled: !!slug
  });

  const { data: reviews } = useQuery({
    queryKey: ['reviews', product?.id],
    queryFn: () => fetchApi<any>(`/reviews/product/${product?.id}?size=50`),
    enabled: !!product?.id
  });

  const submitReview = useMutation({
    mutationFn: (newReview: { productId: string, rating: number, comment: string }) => {
      return fetchApi('/reviews', {
        method: 'POST',
        body: JSON.stringify(newReview)
      });
    },
    onSuccess: () => {
      setReviewSuccess(true);
      setComment("");
      setRating(5);
    }
  });

  if (isLoading) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  if (!product) return <div className="min-h-screen flex justify-center items-center text-xl">Product not found</div>;

  const images = product.media ? [
    ...product.media.filter(m => m.isPrimary).map(m => m.url),
    ...product.media.filter(m => !m.isPrimary).map(m => m.url)
  ] : [];
  const mainImage = images[activeImage] || 'https://via.placeholder.com/800';

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.discountedPrice || product.basePrice,
      imageUrl: mainImage,
      sku: product.sku,
      slug: product.slug,
      quantity: 1
    });
    openCart();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview.mutate({
      productId: product.id,
      rating,
      comment
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-xl overflow-hidden border border-border">
            <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 shrink-0 transition-colors ${activeImage === idx ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {product.badges && product.badges.length > 0 && (
            <div className="flex gap-2 mb-4">
              {product.badges.map(badge => (
                <span key={badge} className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                  {badge}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl font-bold text-primary">₹{(product.discountedPrice || product.basePrice).toLocaleString()}</div>
            {product.discountedPrice && (
              <div className="text-xl text-muted-foreground line-through">₹{product.basePrice.toLocaleString()}</div>
            )}
          </div>
          
          <div className="prose prose-sm text-muted-foreground mb-8">
            <p>{product.description}</p>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-foreground text-background py-4 rounded-md font-bold text-lg flex items-center justify-center gap-2 hover:bg-foreground/90 hover:scale-[1.01] transition-all shadow-md mb-8"
          >
            <ShoppingCart size={20} /> Add to Cart
          </button>
          
          <div className="border-t border-border pt-6 space-y-2 text-sm text-muted-foreground">
            <div className="flex gap-2"><strong>SKU:</strong> {product.sku}</div>
            <div className="flex gap-2"><strong>Category:</strong> <Link href={`/category/${product.category?.slug}`} className="hover:text-primary">{product.category?.name}</Link></div>
            <div className="flex gap-2 text-green-600 items-center mt-2"><Check size={16} /> In Stock & Ready to Ship</div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-border pt-16">
        <h2 className="font-serif text-2xl font-bold mb-8">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Review List */}
          <div className="md:col-span-7 space-y-8">
            {!reviews?.content || reviews.content.length === 0 ? (
              <p className="text-muted-foreground italic">No approved reviews yet. Be the first to review!</p>
            ) : (
              reviews.content.map((review: any) => (
                <div key={review.id} className="border-b border-border pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                      {review.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold">{review.customerName}</div>
                      <div className="flex text-primary">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} size={14} fill={star <= review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-3">{review.comment}</p>
                </div>
              ))
            )}
          </div>
          
          {/* Write a Review */}
          <div className="md:col-span-5 bg-muted/30 p-6 rounded-xl border border-border h-fit">
            <h3 className="font-bold text-lg mb-4">Write a Review</h3>
            
            {!isAuthenticated() ? (
              <div className="text-center p-6 bg-background rounded-lg border border-border shadow-sm">
                <p className="mb-4 text-muted-foreground">You must be logged in to leave a review.</p>
                <Link href="/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-bold hover:bg-primary/90 transition-colors inline-block">
                  Login to Review
                </Link>
              </div>
            ) : reviewSuccess ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-start gap-3">
                <Check className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Thank You!</h4>
                  <p className="text-sm">Your review has been submitted and is pending moderation.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl transition-colors ${star <= rating ? "text-primary" : "text-muted-foreground hover:text-primary/50"}`}
                      >
                        <Star fill={star <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Your Experience</label>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={4}
                    placeholder="Tell us what you think about this product..."
                    className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={submitReview.isPending}
                  className="w-full bg-foreground text-background py-3 rounded-md font-bold hover:bg-foreground/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {submitReview.isPending ? <Loader2 className="animate-spin" /> : "Submit Review"}
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
