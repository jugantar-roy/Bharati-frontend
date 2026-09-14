import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Bharati Kitchenware",
  description: "Get in touch with the Bharati Kitchenware customer support team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have a question about an order, a product, or just want to share a recipe? We're here to help.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-serif font-bold">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Phone className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Customer Support</h3>
                <p className="text-muted-foreground mt-1">+91 1800-123-4567</p>
                <p className="text-sm text-muted-foreground">Mon-Sat, 9am to 6pm IST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Mail className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email Us</h3>
                <p className="text-muted-foreground mt-1">support@bharatikitchen.com</p>
                <p className="text-sm text-muted-foreground">We aim to reply within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Corporate Office</h3>
                <p className="text-muted-foreground mt-1">
                  123 Industrial Estate, Phase 4<br/>
                  Mumbai, Maharashtra 400001<br/>
                  India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-muted/30 p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input type="text" className="w-full p-3 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input type="text" className="w-full p-3 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input type="email" className="w-full p-3 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Order Number (Optional)</label>
              <input type="text" className="w-full p-3 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea rows={5} className="w-full p-3 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary outline-none transition-all resize-none"></textarea>
            </div>

            <button type="button" className="w-full bg-foreground text-background py-3 rounded-md font-bold hover:bg-foreground/90 transition-colors">
              Submit Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
