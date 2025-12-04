import { Package, DollarSign, TrendingDown, CheckCircle } from "lucide-react";

export function StoreMetrics() {
  const metrics = [
    {
      label: "Total Products",
      value: "9",
      icon: <Package className="w-6 h-6 text-[#3498db]" />,
      bgColor: "bg-blue-50",
    },
    {
      label: "Total Inventory Value",
      value: "$255.91",
      icon: <DollarSign className="w-6 h-6 text-[#22c55e]" />,
      bgColor: "bg-green-50",
    },
    {
      label: "Low Stock Items",
      value: "5",
      icon: <TrendingDown className="w-6 h-6 text-red-500" />,
      bgColor: "bg-red-50",
      indicator: "down",
    },
    {
      label: "Out of Stock",
      value: "3",
      icon: <CheckCircle className="w-6 h-6 text-red-600" />,
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-[24px] text-[#1f2933]" style={{ fontWeight: 700 }}>
        Store Performance
      </h2>
      
      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${metric.bgColor} rounded-lg p-3`}>
                {metric.icon}
              </div>
              {metric.indicator === "down" && (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-[13px] text-[#6b7280]">
                {metric.label}
              </p>
              <p className="text-[32px] text-[#1f2933]" style={{ fontWeight: 700, lineHeight: '1.2' }}>
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
