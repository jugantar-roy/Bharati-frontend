import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Bharati</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              Premium Indian kitchenware designed for the modern home. Combining traditional durability with contemporary aesthetics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                YouTube
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Twitter
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium text-lg mb-4 text-white">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/category/pressure-cooker" className="text-sm text-gray-400 hover:text-primary transition-colors">Pressure Cookers</Link></li>
              <li><Link href="/category/kadhai" className="text-sm text-gray-400 hover:text-primary transition-colors">Kadhais</Link></li>
              <li><Link href="/category/saucepan" className="text-sm text-gray-400 hover:text-primary transition-colors">Saucepans</Link></li>
              <li><Link href="/category/thali-set" className="text-sm text-gray-400 hover:text-primary transition-colors">Thali Sets</Link></li>
              <li><Link href="/category/rack-baskets" className="text-sm text-gray-400 hover:text-primary transition-colors">Racks & Baskets</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-lg mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/account" className="text-sm text-gray-400 hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/shipping-policy" className="text-sm text-gray-400 hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-lg mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Bharati Kitchenware. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span>Made in India</span>
            <span className="hidden sm:inline">|</span>
            <span>ISI Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
