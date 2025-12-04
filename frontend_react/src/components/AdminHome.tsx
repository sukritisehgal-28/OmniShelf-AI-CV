import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { DashboardMetrics } from "./DashboardMetrics";
import { StockVisualization } from "./StockVisualization";
import { InventoryTable } from "./InventoryTable";
import { AnalyticsSummaryCards } from "./AnalyticsSummaryCards";
import { CriticalAlerts } from "./CriticalAlerts";
import { ModelPerformancePanel } from "./ModelPerformancePanel";
import { RealTimeDetectionUpload } from "./RealTimeDetectionUpload";
import { SecondaryCharts } from "./SecondaryCharts";
import { DashboardSummary } from "./DashboardSummary";

interface AdminHomeProps {
  onNavigate: (page: string) => void;
  email?: string;
}

const TABS = ["Overview", "Analytics", "Inventory", "Detection"] as const;

export function AdminHome({ onNavigate, email }: AdminHomeProps) {
  const [active, setActive] = useState<(typeof TABS)[number]>("Overview");

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
            <p className="text-[12px] text-[#6b7280]" style={{ fontWeight: 700 }}>Hello, Admin</p>
            <h1 className="text-[24px] text-[#111827]" style={{ fontWeight: 800 }}>Admin Dashboard</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-2 rounded-lg text-[13px] border transition-all ${active === tab ? "bg-[#0ea5e9] text-white border-[#0ea5e9] shadow-md" : "bg-[#f8f9fa] text-[#0f172a] border-[#cbd5e1] hover:bg-[#e2e8f0] hover:border-[#94a3b8]"}`}
              style={{ fontWeight: 700 }}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto p-8 space-y-8">
        {active === "Overview" && (
          <div className="space-y-6">
            <ModelPerformancePanel />
            <DashboardMetrics />
            <SecondaryCharts />
            <DashboardSummary />
            
            {/* Quick Preview: Analytics */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] text-[#111827]" style={{ fontWeight: 800 }}>Analytics Preview</h3>
                <button
                  onClick={() => setActive("Analytics")}
                  className="text-[13px] text-[#0ea5e9] hover:text-[#0284c7]" style={{ fontWeight: 600 }}
                >
                  View All →
                </button>
              </div>
              <AnalyticsSummaryCards />
            </div>
            
            {/* Quick Preview: Critical Alerts */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] text-[#111827]" style={{ fontWeight: 800 }}>Inventory Alerts</h3>
                <button
                  onClick={() => setActive("Inventory")}
                  className="text-[13px] text-[#0ea5e9] hover:text-[#0284c7]" style={{ fontWeight: 600 }}
                >
                  View Inventory →
                </button>
              </div>
              <CriticalAlerts />
            </div>
            
            {/* Quick Preview: Detection */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] text-[#111827]" style={{ fontWeight: 800 }}>Real-Time Detection</h3>
                <button
                  onClick={() => setActive("Detection")}
                  className="text-[13px] text-[#0ea5e9] hover:text-[#0284c7]" style={{ fontWeight: 600 }}
                >
                  Go to Detection →
                </button>
              </div>
              <p className="text-[14px] text-[#6b7280] mb-4">Upload CSV files to run YOLO detection on shelf images</p>
              <div className="bg-[#f8f9fa] rounded-xl p-4 border border-[#e5e7eb]">
                <p className="text-[13px] text-[#475569]">📊 Click "Go to Detection" to upload and analyze images</p>
              </div>
            </div>
          </div>
        )}

        {active === "Analytics" && (
          <div className="space-y-6">
            <AnalyticsSummaryCards />
            <StockVisualization />
          </div>
        )}

        {active === "Inventory" && (
          <div className="space-y-6">
            <InventoryTable />
          </div>
        )}

        {active === "Detection" && (
          <div className="space-y-6">
            <RealTimeDetectionUpload />
          </div>
        )}
      </main>
    </div>
  );
}
