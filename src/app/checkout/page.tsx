"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { fetchApi } from "@/lib/api/client";
import { OrderResponseDTO } from "@/types/orders"; // Will create this
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    setMounted(true);
    if (mounted && items.length === 0) {
      router.push("/");
    }
  }, [mounted, items.length, router]);

  if (!mounted || items.length === 0) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initPayment = (orderData: OrderResponseDTO) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      amount: parseFloat(orderData.amount) * 100, // paise
      currency: orderData.currency,
      name: "Bharati Kitchenware",
      description: "Premium Indian Kitchenware",
      order_id: orderData.razorpayOrderId,
      handler: async function (response: any) {
        try {
          const verifyData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };
          
          await fetchApi('/orders/verify-payment', {
            method: 'POST',
            body: JSON.stringify(verifyData)
          });
          
          clearCart();
          router.push(`/checkout/success?order=${orderData.orderNumber}`);
        } catch (err: any) {
          setError(err.message || "Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#c9933b", // Primary brand color
      },
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      setError("Payment failed: " + response.error.description);
    });
    rzp.open();
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderPayload = {
        items: items.map(item => ({ productId: item.productId, quantity: item.quantity })),
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingLine1: formData.address,
        shippingCity: formData.city,
        shippingState: formData.state,
        shippingPincode: formData.pincode,
      };

      const response = await fetchApi<OrderResponseDTO>('/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload)
      });

      initPayment(response);
    } catch (err: any) {
      setError(err.message || "Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Secure Checkout</h1>
          <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2">
            <ShieldCheck size={18} className="text-primary" /> 100% Safe & Secure Payments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-7 xl:col-span-8 bg-background p-6 md:p-8 rounded-xl shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Shipping Address *</label>
                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="House/Flat No., Street, Area" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State *</label>
                  <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">PIN Code *</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-md font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-8"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <>Pay ₹{subtotal.toLocaleString()} <ArrowRight size={20} /></>}
              </button>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-background p-6 md:p-8 rounded-xl shadow-sm border border-border sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-16 h-16 rounded bg-muted overflow-hidden shrink-0">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                      <div className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-bold text-sm flex items-center">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center mt-2">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
