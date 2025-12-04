import { useEffect, useState } from "react";
import { CheckCircle2, Gauge, ShieldCheck, Database, AlertTriangle } from "lucide-react";
import { fetchModelMetrics, ModelMetrics } from "../services/api";

export function ModelPerformanceSection() {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchModelMetrics();
        setMetrics(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load model metrics");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    {
      label: "mAP@50",
      value: metrics?.metrics?.["val_mAP50"] ? `${(metrics.metrics["val_mAP50"] * 100).toFixed(2)}%` : "—",
      desc: "Validation",
      icon: Gauge,
      tone: "bg-blue-50 text-[#1f2937]",
    },
    {
      label: "mAP@50-95",
      value: metrics?.metrics?.["val_mAP50-95"] ? `${(metrics.metrics["val_mAP50-95"] * 100).toFixed(2)}%` : "—",
      desc: "Validation",
      icon: Gauge,
      tone: "bg-indigo-50 text-[#1f2937]",
    },
    {
      label: "Precision / Recall",
      value:
        metrics?.metrics?.val_precision !== undefined && metrics.metrics?.val_recall !== undefined
          ? `${(metrics.metrics.val_precision * 100).toFixed(1)}% / ${(metrics.metrics.val_recall * 100).toFixed(1)}%`
          : "—",
      desc: "Validation",
      icon: CheckCircle2,
      tone: "bg-emerald-50 text-[#1f2937]",
    },
    {
      label: "Robustness (proxy)",
      value: metrics?.qualitative_analysis?.robustness_score_percent
        ? `${metrics.qualitative_analysis.robustness_score_percent.toFixed(1)}%`
        : "—",
      desc: "Baseline vs stress-test",
      icon: ShieldCheck,
      tone: "bg-amber-50 text-[#1f2937]",
    },
    {
      label: "Real shelf proxy",
      value: metrics?.real_shelf_proxy_mAP ? metrics.real_shelf_proxy_mAP.toFixed(3) : "—",
      desc: "Avg confidence",
      icon: Database,
      tone: "bg-slate-50 text-[#1f2937]",
    },
    {
      label: "Weights",
      value: metrics?.weights_size_mb ? `${metrics.weights_size_mb} MB` : "—",
      desc: metrics?.model_exists ? "Loaded" : "Missing",
      icon: Database,
      tone: "bg-cyan-50 text-[#1f2937]",
    },
  ].slice(0, 4); // keep layout similar

  return (
    <section className="py-20 bg-gradient-to-br from-[#f8fafc] to-[#e0f2fe]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#dbeafe] text-[#1e40af] px-4 py-2 rounded-full text-[13px] mb-4" style={{ fontWeight: 700 }}>
            🚀 POWERED BY AI
          </div>
          <h2 className="text-[42px] text-[#0f172a] mb-4" style={{ fontWeight: 900 }}>
            State-of-the-Art Model Performance
          </h2>
          <p className="text-[18px] text-[#475569] max-w-2xl mx-auto">
            Live metrics pulled from the latest trained weights and evaluation report.
          </p>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-[14px]">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className={`rounded-2xl p-6 border border-[#e2e8f0] ${metric.tone} shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[13px] text-[#475569]" style={{ fontWeight: 700 }}>{metric.label}</p>
                  <div className="bg-white/80 rounded-lg p-2.5 border border-white/60">
                    <Icon className="w-5 h-5 text-[#334155]" />
                  </div>
                </div>
                <p className="text-[28px] text-[#0f172a] mb-1" style={{ fontWeight: 800 }}>
                  {loading ? "…" : metric.value}
                </p>
                <p className="text-[12px] text-[#475569]">{metric.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb] shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[24px] text-[#0f172a]" style={{ fontWeight: 800 }}>Training Details</h3>
              <p className="text-[14px] text-[#6b7280] mt-1">
                {metrics?.run_name ? `Run: ${metrics.run_name}` : "Latest training run"} • {metrics?.last_updated ? `Updated ${new Date(metrics.last_updated).toLocaleDateString()}` : "No timestamp"}
              </p>
            </div>
            <div className="bg-[#f1f5f9] px-4 py-2 rounded-full">
              <span className="text-[13px] text-[#334155]" style={{ fontWeight: 700 }}>YOLOv11s</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#f8fafc] rounded-xl p-5 border border-[#e2e8f0]">
              <p className="text-[12px] text-[#6b7280] mb-1" style={{ fontWeight: 600 }}>Dataset</p>
              <p className="text-[20px] text-[#0f172a]" style={{ fontWeight: 700 }}>Grozi-120</p>
              <p className="text-[12px] text-[#6b7280] mt-1">576 train, 100 val images</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-5 border border-[#e2e8f0]">
              <p className="text-[12px] text-[#6b7280] mb-1" style={{ fontWeight: 600 }}>Training Time</p>
              <p className="text-[20px] text-[#0f172a]" style={{ fontWeight: 700 }}>
                {metrics?.success_criteria_evaluation ? "Complete" : "—"}
              </p>
              <p className="text-[12px] text-[#6b7280] mt-1">Colab T4 GPU</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-5 border border-[#e2e8f0]">
              <p className="text-[12px] text-[#6b7280] mb-1" style={{ fontWeight: 600 }}>Hardware</p>
              <p className="text-[20px] text-[#0f172a]" style={{ fontWeight: 700 }}>Tesla T4</p>
              <p className="text-[12px] text-[#6b7280] mt-1">16GB VRAM, Google Colab</p>
            </div>
          </div>

          {metrics?.tech_stack && metrics.tech_stack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {metrics.tech_stack.map((item) => (
                <span
                  key={item}
                  className="bg-[#ecf2ff] text-[#1f2937] px-3 py-1.5 rounded-lg text-[12px] border border-[#dbeafe]"
                  style={{ fontWeight: 600 }}
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
