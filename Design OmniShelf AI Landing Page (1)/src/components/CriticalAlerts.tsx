import { AlertTriangle, XOctagon } from "lucide-react";

interface ProductAlert {
  name: string;
  shelf: string;
  price: string;
  stock?: number;
}

export function CriticalAlerts() {
  const outOfStockProducts: ProductAlert[] = [
    { name: "Organic Whole Milk", shelf: "A1", price: "$5.99" },
    { name: "Fresh Blueberries", shelf: "B3", price: "$6.49" },
    { name: "Artisan Sourdough Bread", shelf: "C2", price: "$7.99" },
  ];

  const lowStockProducts: ProductAlert[] = [
    { name: "Greek Yogurt 32oz", shelf: "A2", price: "$8.99", stock: 3 },
    { name: "Cage-Free Eggs", shelf: "A4", price: "$5.49", stock: 5 },
    { name: "Grass-Fed Butter", shelf: "A3", price: "$6.99", stock: 2 },
    { name: "Organic Strawberries", shelf: "B1", price: "$7.49", stock: 4 },
    { name: "Dark Chocolate Bar", shelf: "D5", price: "$4.29", stock: 6 },
  ];

  return (
    <div className="space-y-8">
      {/* Out of Stock Section */}
      <div className="space-y-4">
        <div className="bg-[#fee2e2] border-l-4 border-red-500 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <XOctagon className="w-5 h-5 text-red-600" />
            <p className="text-[15px] text-red-700" style={{ fontWeight: 600 }}>
              {outOfStockProducts.length} products OUT OF STOCK – immediate action required!
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {outOfStockProducts.map((product, index) => (
            <div 
              key={index}
              className="bg-[#fef2f2] border-l-4 border-red-500 rounded-xl p-5 shadow-sm"
            >
              <div className="space-y-2">
                <h3 className="text-[16px] text-[#1f2933]" style={{ fontWeight: 700 }}>
                  {product.name}
                </h3>
                <div className="space-y-1">
                  <p className="text-[13px] text-[#6b7280]">
                    Shelf: <span className="text-[#1f2933]" style={{ fontWeight: 600 }}>{product.shelf}</span>
                  </p>
                  <p className="text-[13px] text-[#6b7280]">
                    Price: <span className="text-[#1f2933]" style={{ fontWeight: 600 }}>{product.price}</span>
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-block bg-red-600 text-white text-[11px] px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                    OUT OF STOCK
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Low Stock Section */}
      <div className="space-y-4">
        <div className="bg-[#fef3c7] border-l-4 border-yellow-600 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-700" />
            <p className="text-[15px] text-yellow-800" style={{ fontWeight: 600 }}>
              {lowStockProducts.length} products with LOW stock – restock soon!
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {lowStockProducts.map((product, index) => (
            <div 
              key={index}
              className="bg-[#fffbeb] border-l-4 border-orange-500 rounded-xl p-5 shadow-sm"
            >
              <div className="space-y-2">
                <h3 className="text-[16px] text-[#1f2933]" style={{ fontWeight: 700 }}>
                  {product.name}
                </h3>
                <div className="space-y-1">
                  <p className="text-[13px] text-[#6b7280]">
                    Shelf: <span className="text-[#1f2933]" style={{ fontWeight: 600 }}>{product.shelf}</span>
                  </p>
                  <p className="text-[13px] text-[#6b7280]">
                    Stock: <span className="text-orange-600" style={{ fontWeight: 600 }}>{product.stock} units</span>
                  </p>
                  <p className="text-[13px] text-[#6b7280]">
                    Price: <span className="text-[#1f2933]" style={{ fontWeight: 600 }}>{product.price}</span>
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-block bg-orange-500 text-white text-[11px] px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                    LOW STOCK
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
