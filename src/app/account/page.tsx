"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { fetchApi } from "@/lib/api/client";
import { LogOut, User, MapPin, Package, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses">("profile");
  
  useEffect(() => {
    setMounted(true);
    if (mounted && !isAuthenticated()) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !user) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-serif font-bold text-primary">{user.name.charAt(0)}</span>
              </div>
              <h2 className="font-bold text-lg line-clamp-1">{user.name}</h2>
              <p className="text-sm text-muted-foreground">+91 {user.phone}</p>
            </div>
            
            <nav className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${activeTab === 'profile' ? 'bg-primary/5 text-primary border-l-4 border-primary font-bold' : 'hover:bg-muted'}`}
              >
                <User size={20} /> My Profile
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${activeTab === 'orders' ? 'bg-primary/5 text-primary border-l-4 border-primary font-bold' : 'hover:bg-muted'}`}
              >
                <Package size={20} /> Order History
              </button>
              <button 
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${activeTab === 'addresses' ? 'bg-primary/5 text-primary border-l-4 border-primary font-bold' : 'hover:bg-muted'}`}
              >
                <MapPin size={20} /> Saved Addresses
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={20} /> Logout
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-background p-6 md:p-8 rounded-xl shadow-sm border border-border min-h-[500px]">
              
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-border rounded-lg bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-1">Mobile Number</p>
                      <p className="font-medium">+91 {user.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">Order History</h2>
                  <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                    <Package className="mx-auto mb-4 opacity-50" size={48} />
                    <p>You haven't placed any orders yet.</p>
                    <Link href="/" className="text-primary hover:underline mt-2 inline-block">Start Shopping</Link>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">Saved Addresses</h2>
                  <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                    <MapPin className="mx-auto mb-4 opacity-50" size={48} />
                    <p>No addresses saved yet.</p>
                    <p className="text-sm mt-2">Addresses used during checkout will appear here.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
