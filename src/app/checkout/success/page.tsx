import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage({ searchParams }: { searchParams: { order?: string } }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md w-full bg-background p-8 rounded-2xl shadow-sm border border-border">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        
        <h1 className="font-serif text-3xl font-bold mb-4 text-foreground">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for shopping with Bharati. Your order has been placed successfully and will be processed soon.
        </p>
        
        {searchParams.order && (
          <div className="bg-muted p-4 rounded-md mb-8 inline-block w-full">
            <span className="text-sm text-muted-foreground block mb-1">Order Number:</span>
            <span className="font-mono font-bold text-lg">{searchParams.order}</span>
          </div>
        )}
        
        <Link 
          href="/"
          className="block w-full bg-primary text-primary-foreground py-3 rounded-md font-bold hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
