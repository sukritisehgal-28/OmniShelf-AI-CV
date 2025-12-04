import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Search, Package, TrendingUp } from "lucide-react";

interface UserDashboardProps {
  onNavigate: (page: string) => void;
  email?: string;
}

export function UserDashboard({ onNavigate, email }: UserDashboardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-[#f8f9fa]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header className="bg-white border-b border-[#e5e7eb] px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9] rounded-lg transition-colors border border-[#e5e7eb]"
            style={{ fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div>
            <p className="text-[12px] text-[#6b7280]" style={{ fontWeight: 700 }}>Hello, {email || "User"}</p>
            <h1 className="text-[24px] text-[#111827]" style={{ fontWeight: 800 }}>Shopping Assistant</h1>
          </div>
        </div>
      </header>

      {mounted && (
        <main className="max-w-[1200px] mx-auto p-8 space-y-8">
          {/* Welcome Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-[28px] mb-2" style={{ fontWeight: 800 }}>
              Welcome to OmniShelf AI! 🛒
            </h2>
            <p className="text-[14px] text-blue-100 mb-6" style={{ fontWeight: 500 }}>
              Find products instantly with our AI-powered shopping assistant. Enter what you need and we'll show you exactly where to find it, how much stock is available, and the current price.
            </p>
            <button
              onClick={() => onNavigate("smartcart")}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl text-[14px] hover:bg-blue-50 transition-all shadow-md flex items-center gap-2"
              style={{ fontWeight: 700 }}
            >
              <ShoppingCart className="w-5 h-5" />
              Open SmartCart AI
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-[18px] text-[#111827] mb-2" style={{ fontWeight: 700 }}>
                Smart Search
              </h3>
              <p className="text-[13px] text-[#6b7280]" style={{ fontWeight: 500 }}>
                Our AI recognizes product names and finds them instantly. Just type what you need like "coffee" or "milk".
              </p>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-[18px] text-[#111827] mb-2" style={{ fontWeight: 700 }}>
                Real-Time Stock
              </h3>
              <p className="text-[13px] text-[#6b7280]" style={{ fontWeight: 500 }}>
                See current stock levels (HIGH, MEDIUM, LOW) so you know if items are available before you shop.
              </p>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-[18px] text-[#111827] mb-2" style={{ fontWeight: 700 }}>
                Aisle Location
              </h3>
              <p className="text-[13px] text-[#6b7280]" style={{ fontWeight: 500 }}>
                Get exact aisle numbers for every product, making your shopping trip faster and more efficient.
              </p>
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
            <h3 className="text-[18px] text-[#111827] mb-4" style={{ fontWeight: 800 }}>
              How to Use SmartCart AI
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-[14px]" style={{ fontWeight: 700 }}>
                  1
                </div>
                <div>
                  <p className="text-[14px] text-[#111827]" style={{ fontWeight: 700 }}>
                    Click "Open SmartCart AI"
                  </p>
                  <p className="text-[12px] text-[#6b7280]" style={{ fontWeight: 500 }}>
                    Access the shopping assistant from this dashboard
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-[14px]" style={{ fontWeight: 700 }}>
                  2
                </div>
                <div>
                  <p className="text-[14px] text-[#111827]" style={{ fontWeight: 700 }}>
                    Enter your shopping list
                  </p>
                  <p className="text-[12px] text-[#6b7280]" style={{ fontWeight: 500 }}>
                    Type product names separated by commas (e.g., "coffee, milk, bread, chips")
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-[14px]" style={{ fontWeight: 700 }}>
                  3
                </div>
                <div>
                  <p className="text-[14px] text-[#111827]" style={{ fontWeight: 700 }}>
                    Get instant results
                  </p>
                  <p className="text-[12px] text-[#6b7280]" style={{ fontWeight: 500 }}>
                    See aisle location, stock level, price, and category for each product
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-[24px] mb-3" style={{ fontWeight: 800 }}>
              Ready to start shopping smarter?
            </h3>
            <p className="text-[14px] text-indigo-100 mb-6" style={{ fontWeight: 500 }}>
              Try SmartCart AI now and save time on your next store visit!
            </p>
            <button
              onClick={() => onNavigate("smartcart")}
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl text-[14px] hover:bg-indigo-50 transition-all shadow-md inline-flex items-center gap-2"
              style={{ fontWeight: 700 }}
            >
              <ShoppingCart className="w-5 h-5" />
              Launch SmartCart AI
            </button>
          </div>
        </main>
      )}
    </div>
  );
}
