"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFAB() {
  // Replace with the actual WhatsApp number configured by the user
  const whatsappNumber = "919876543210"; 
  const message = encodeURIComponent("Hello! I have a question about Bharati Kitchenware.");
  const waLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 bg-foreground text-background text-sm font-medium px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
        Need help? Chat with us!
      </span>
    </a>
  );
}
