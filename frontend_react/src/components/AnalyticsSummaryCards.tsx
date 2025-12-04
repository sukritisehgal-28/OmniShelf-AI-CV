import { useEffect, useState } from "react";
import { fetchStockSummary } from "../services/api";
import { BarChart3, DollarSign, MapPin, TrendingUp } from "lucide-react";
import { prettyProductName } from "../utils/product";

interface SummaryCard {
  title: string;
  value: string;
  subtitle: string;
  icon: JSX.Element;
  tone: string;
}

export function AnalyticsSummaryCards() {
  const [cards, setCards] = useState<SummaryCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await fetchStockSummary();
        const totalUnits = products.reduce((sum, p) => sum + p.total_count, 0);
        const totalValue = products.reduce((sum, p) => sum + (p.inventory_value || 0), 0);
        const shelvesCovered = new Set(
          products.flatMap(p => Object.keys(p.shelf_breakdown || {})).filter(Boolean)
        ).size;
        const topProduct = [...products]
          .sort((a, b) => b.total_count - a.total_count)
          .find(Boolean);

        setCards([
          {
            title: "Active SKUs",
            value: products.length.toString(),
            subtitle: "Unique products currently tracked",
            icon: <BarChart3 className="w-5 h-5 text-[#2563eb]" />,
            tone: "bg-blue-50 text-[#1f2937]"
          },
          {
            title: "Total Units",
            value: totalUnits.toString(),
            subtitle: "All detections across shelves",
            icon: <TrendingUp className="w-5 h-5 text-[#16a34a]" />,
            tone: "bg-green-50 text-[#1f2937]"
          },
          {
            title: "Inventory Value",
            value: `$${totalValue.toFixed(2)}`,
            subtitle: "Based on configured prices",
            icon: <DollarSign className="w-5 h-5 text-[#f59e0b]" />,
            tone: "bg-amber-50 text-[#1f2937]"
          },
          {
            title: "Shelves Covered",
            value: shelvesCovered.toString(),
            subtitle: "Unique shelf IDs with detections",
            icon: <MapPin className="w-5 h-5 text-[#0ea5e9]" />,
            tone: "bg-sky-50 text-[#1f2937]"
          },
        ].map(card => ({
          ...card,
          subtitle: card.subtitle + (topProduct && card.title === "Active SKUs"
            ? ` • Top: ${prettyProductName(topProduct.display_name, topProduct.product_name)}`
            : card.subtitle)
        })));
      } catch (error) {
        console.error("Failed to load analytics summary:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm h-[120px] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div 
          key={idx}
          className={`rounded-xl p-5 shadow-sm border border-[#e5e7eb] ${card.tone} bg-opacity-70`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] text-[#6b7280]" style={{ fontWeight: 600 }}>
              {card.title}
            </p>
            <div className="bg-white/70 rounded-lg p-2 border border-white/60">
              {card.icon}
            </div>
          </div>
          <p className="text-[26px] text-[#111827]" style={{ fontWeight: 700 }}>
            {card.value}
          </p>
          <p className="text-[12px] text-[#6b7280] mt-1">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
