"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewCarousel() {
  const reviews = [
    { id: 1, name: "Priya Sharma", rating: 5, comment: "The pressure cooker is absolutely fantastic. It cooks dal in minutes and the build quality is premium." },
    { id: 2, name: "Rahul Verma", rating: 5, comment: "I've been using their Kadhai for 6 months. Nothing sticks and it's so easy to clean." },
    { id: 3, name: "Anita Desai", rating: 4, comment: "Very elegant thali set, reminds me of the traditional ones we had growing up but much lighter." },
    { id: 4, name: "Vikram Singh", rating: 5, comment: "Great customer service and the saucepan is exactly as described. Worth every rupee." },
  ];

  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Loved by Indian Kitchens</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Don't just take our word for it. Here is what our customers have to say.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col h-full"
            >
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-600"} />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6 flex-1">"{review.comment}"</p>
              <div className="font-medium text-white">- {review.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
