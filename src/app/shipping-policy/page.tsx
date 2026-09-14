import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Bharati Kitchenware",
  description: "Information regarding shipping, delivery times, and costs.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl font-bold mb-8 border-b border-border pb-4">Shipping & Delivery Policy</h1>
      
      <div className="prose prose-slate max-w-none text-muted-foreground space-y-6">
        <p>Last updated: October 1, 2024</p>
        
        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Order Processing Time</h3>
        <p>All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
        
        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. Domestic Shipping Rates and Estimates</h3>
        <p>We offer flat rate shipping across India:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Standard Shipping (5-7 business days):</strong> ₹99</li>
          <li><strong>Express Shipping (2-3 business days):</strong> ₹249</li>
          <li><strong>Free Standard Shipping:</strong> On all orders over ₹1,500.</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. In-store Pickup</h3>
        <p>We do not currently offer in-store pickup as our facilities are strictly manufacturing and distribution centers.</p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">4. International Shipping</h3>
        <p>At this time, we only ship within India. We are working on expanding our logistics to support international orders in the near future.</p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">5. How do I check the status of my order?</h3>
        <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
      </div>
    </div>
  );
}
