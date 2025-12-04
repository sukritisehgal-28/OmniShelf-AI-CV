import { Badge } from "./ui/badge";

interface InventoryItem {
  product: string;
  category: string;
  shelf: string;
  count: number;
  price: number;
  value: number;
  stockLevel: "HIGH" | "MEDIUM" | "LOW" | "OUT";
}

export function ShelfInventoryTable() {
  const inventoryData: InventoryItem[] = [
    { product: "Organic Whole Milk", category: "Dairy", shelf: "A1", count: 0, price: 5.99, value: 0, stockLevel: "OUT" },
    { product: "Greek Yogurt 32oz", category: "Dairy", shelf: "A2", count: 3, price: 8.99, value: 26.97, stockLevel: "LOW" },
    { product: "Grass-Fed Butter", category: "Dairy", shelf: "A3", count: 2, price: 6.99, value: 13.98, stockLevel: "LOW" },
    { product: "Cage-Free Eggs", category: "Dairy", shelf: "A4", count: 5, price: 5.49, value: 27.45, stockLevel: "MEDIUM" },
    { product: "Organic Strawberries", category: "Produce", shelf: "B1", count: 4, price: 7.49, value: 29.96, stockLevel: "LOW" },
    { product: "Fresh Blueberries", category: "Produce", shelf: "B3", count: 0, price: 6.49, value: 0, stockLevel: "OUT" },
    { product: "Artisan Sourdough Bread", category: "Bakery", shelf: "C2", count: 0, price: 7.99, value: 0, stockLevel: "OUT" },
    { product: "Dark Chocolate Bar", category: "Snacks", shelf: "D5", count: 6, price: 4.29, value: 25.74, stockLevel: "MEDIUM" },
    { product: "Organic Trail Mix", category: "Snacks", shelf: "D7", count: 12, price: 8.99, value: 107.88, stockLevel: "HIGH" },
  ];

  const getStockLevelBadge = (level: string) => {
    const styles = {
      HIGH: "bg-green-100 text-green-700 border-green-300",
      MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-300",
      LOW: "bg-orange-100 text-orange-700 border-orange-300",
      OUT: "bg-red-100 text-red-700 border-red-300",
    };

    return (
      <Badge 
        variant="outline" 
        className={`${styles[level as keyof typeof styles]} text-[11px] px-2 py-1`}
        style={{ fontWeight: 600 }}
      >
        {level}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-[24px] text-[#1f2933]" style={{ fontWeight: 700 }}>
        Shelf Inventory Table
      </h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2c3e50]">
                <th className="text-left px-6 py-4 text-[13px] text-white" style={{ fontWeight: 600 }}>
                  Product
                </th>
                <th className="text-left px-6 py-4 text-[13px] text-white" style={{ fontWeight: 600 }}>
                  Category
                </th>
                <th className="text-left px-6 py-4 text-[13px] text-white" style={{ fontWeight: 600 }}>
                  Shelf
                </th>
                <th className="text-right px-6 py-4 text-[13px] text-white" style={{ fontWeight: 600 }}>
                  Count
                </th>
                <th className="text-right px-6 py-4 text-[13px] text-white" style={{ fontWeight: 600 }}>
                  Price
                </th>
                <th className="text-right px-6 py-4 text-[13px] text-white" style={{ fontWeight: 600 }}>
                  Value
                </th>
                <th className="text-center px-6 py-4 text-[13px] text-white" style={{ fontWeight: 600 }}>
                  Stock Level
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr 
                  key={index}
                  className={`
                    border-b border-[#e5e7eb] transition-colors
                    ${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}
                    hover:bg-[#f1f5f9]
                  `}
                >
                  <td className="px-6 py-4 text-[13px] text-[#1f2933]">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7280]">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6b7280]">
                    {item.shelf}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#1f2933] text-right" style={{ fontWeight: 600 }}>
                    {item.count}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#1f2933] text-right">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#1f2933] text-right" style={{ fontWeight: 600 }}>
                    ${item.value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStockLevelBadge(item.stockLevel)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
