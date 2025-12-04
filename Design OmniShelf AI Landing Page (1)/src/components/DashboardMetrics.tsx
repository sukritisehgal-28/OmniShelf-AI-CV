import { Package, DollarSign, AlertTriangle, XCircle, CheckCircle } from "lucide-react";

export function DashboardMetrics() {
  const outOfStockCount = 3;
  
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
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      bgColor: "bg-orange-50",
      indicator: "warning",
    },
    {
      label: "Out of Stock",
      value: outOfStockCount.toString(),
      icon: outOfStockCount > 0 
        ? <XCircle className="w-6 h-6 text-red-600" />
        : <CheckCircle className="w-6 h-6 text-[#22c55e]" />,
      bgColor: outOfStockCount > 0 ? "bg-red-50" : "bg-green-50",
    },
  ];

  return (
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
            {metric.indicator === "warning" && (
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
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
  );
}
