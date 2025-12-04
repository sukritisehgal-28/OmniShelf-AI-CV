import { Button } from "./ui/button";
import { ShieldCheck, User } from "lucide-react";

interface RoleSelectorProps {
  onSelectRole: (role: "admin" | "user") => void;
  onNavigate: (page: string) => void;
}

export function RoleSelector({ onSelectRole, onNavigate }: RoleSelectorProps) {
  return (
    <section id="role-select" className="w-full bg-gradient-to-br from-[#f8f9fa] via-white to-[#e3f2fd] px-8 py-20">
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="text-[36px] mb-4" style={{ fontWeight: 800, color: '#1f2933' }}>
          Choose Your Dashboard
        </h2>
        <p className="text-[16px] text-[#6b7280] mb-12 max-w-[600px] mx-auto">
          Select your role to access the appropriate dashboard. Admins manage inventory and run detections. 
          Users view stock and shopping insights.
        </p>

        <div className="grid grid-cols-2 gap-8 max-w-[700px] mx-auto">
          {/* Admin Card */}
          <div className="bg-white rounded-2xl border-2 border-[#e5e7eb] p-8 hover:border-[#3498db] transition-all shadow-lg hover:shadow-xl">
            <div className="bg-[#3498db]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-[#3498db]" />
            </div>
            <h3 className="text-[22px] mb-2" style={{ fontWeight: 800, color: '#1f2933' }}>
              Admin
            </h3>
            <p className="text-[13px] text-[#6b7280] mb-6 leading-relaxed">
              Manage inventory, run real-time detections, view analytics, and monitor alerts
            </p>
            <Button
              onClick={() => onSelectRole("admin")}
              className="w-full bg-[#3498db] text-white hover:bg-[#2980b9] h-12 rounded-lg"
              style={{ fontWeight: 700 }}
            >
              Login as Admin
            </Button>
          </div>

          {/* User Card */}
          <div className="bg-white rounded-2xl border-2 border-[#e5e7eb] p-8 hover:border-[#22c55e] transition-all shadow-lg hover:shadow-xl">
            <div className="bg-[#22c55e]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-[#22c55e]" />
            </div>
            <h3 className="text-[22px] mb-2" style={{ fontWeight: 800, color: '#1f2933' }}>
              User
            </h3>
            <p className="text-[13px] text-[#6b7280] mb-6 leading-relaxed">
              View store metrics, browse inventory, and access shopping assistant features
            </p>
            <Button
              onClick={() => onSelectRole("user")}
              className="w-full bg-[#22c55e] text-white hover:bg-[#16a34a] h-12 rounded-lg"
              style={{ fontWeight: 700 }}
            >
              Login as User
            </Button>
          </div>
        </div>

        <button
          onClick={() => onNavigate("home")}
          className="mt-8 text-[13px] text-[#6b7280] hover:text-[#1f2933] underline"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}
