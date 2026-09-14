import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Bharati Kitchenware",
  description: "Learn about the heritage and craftsmanship behind Bharati Kitchenware.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>
      
      <div className="prose prose-lg mx-auto text-muted-foreground">
        <p className="lead text-xl text-foreground font-medium mb-8 text-center">
          For generations, the kitchen has been the heart of the Indian home. At Bharati, we believe that the tools you use should honor the traditions you cook with.
        </p>
        
        <div className="my-12 aspect-video bg-muted rounded-xl overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745a8050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Bharati Kitchenware Craftsmanship" 
            className="object-cover w-full h-full"
          />
        </div>

        <h3>Our Heritage</h3>
        <p>
          Founded on the principles of durability, elegance, and utility, Bharati Kitchenware started as a small workshop and has grown into a beloved staple in households across the nation. We specialize in high-quality pressure cookers, kadhais, and daily essential utensils.
        </p>
        
        <h3>Uncompromising Quality</h3>
        <p>
          Every piece of Bharati kitchenware is forged with precision. We source the finest food-grade stainless steel and virgin aluminum to ensure that your cookware is not just beautiful, but built to last a lifetime. Our safety standards are rigorously tested, so you can focus on what matters most: the food.
        </p>

        <h3>Our Promise</h3>
        <p>
          We promise to continue innovating while respecting the traditional cooking methods that make our cuisine unique. Whether you are steaming idlis for breakfast or slow-cooking a rich biryani for dinner, Bharati is with you every step of the way.
        </p>
      </div>
    </div>
  );
}
