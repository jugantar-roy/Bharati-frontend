"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { fetchApi } from "@/lib/api/client";
import { ArrowRight, Loader2, KeyRound } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth, isAuthenticated } = useAuthStore();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState(""); // For first-time users
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated()) {
    router.push("/account");
    return null;
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    
    setLoading(true);
    try {
      await fetchApi("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await fetchApi<any>("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phone, otp, name }),
      });
      
      setAuth(response.token, {
        id: response.customerId,
        name: response.name,
        phone: response.phone,
      });
      
      router.push("/account");
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-muted/20">
      <div className="max-w-md w-full bg-background p-8 rounded-2xl shadow-sm border border-border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="text-primary" size={32} />
          </div>
          <h1 className="font-serif text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            {step === 1 ? "Enter your phone number to continue" : "Enter the OTP sent to your phone"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 border border-red-100 text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-border bg-muted text-muted-foreground">
                  +91
                </span>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10 digit number"
                  className="flex-1 p-3 border border-border rounded-r-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Name (Optional for new users)</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || phone.length < 10}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-center text-muted-foreground">
                OTP sent to +91 {phone}
              </label>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="••••••"
                className="w-full p-4 border border-border rounded-md text-center text-2xl tracking-[0.5em] focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || otp.length !== 6}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Verify & Login <ArrowRight size={18} /></>}
            </button>
            
            <button 
              type="button"
              onClick={() => { setStep(1); setOtp(""); setError(""); }}
              className="w-full text-sm text-primary hover:underline text-center"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
