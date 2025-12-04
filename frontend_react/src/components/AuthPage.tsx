import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { adminLogin, adminSignup, userLogin, userSignup, AuthResponse } from "../services/api";

type Role = "admin" | "user";
type Mode = "login" | "signup";

interface AuthPageProps {
  onAuthSuccess: (auth: AuthResponse) => void;
  onNavigate: (page: string) => void;
}

export function AuthPage({ onAuthSuccess, onNavigate }: AuthPageProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
  }, [mode, role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let resp: AuthResponse;
      if (role === "admin") {
        resp = mode === "login" ? await adminLogin(email, password) : await adminSignup(email, password);
      } else {
        resp = mode === "login" ? await userLogin(email, password) : await userSignup(email, password);
      }
      localStorage.setItem("omnishelf_auth", JSON.stringify(resp));
      onAuthSuccess(resp);
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3f2fd] via-white to-[#f5f5f5] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] max-w-5xl w-full grid grid-cols-2 overflow-hidden">
        {/* Left panel */}
        <div className="p-10 bg-[#0f172a] text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#2563eb33,transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,#22d3ee33,transparent)]" />
          <div className="relative space-y-8">
            <h1 className="text-[32px]" style={{ fontWeight: 800 }}>Welcome to OmniShelf AI</h1>
            <p className="text-[15px] text-[#cbd5e1] leading-relaxed">
              Secure access for Admins and Users. Admins manage shelves, run detections, and view analytics. Users view stock and insights.
            </p>
            <div className="grid grid-cols-2 gap-3 text-[12px] text-[#cbd5e1]">
              <div>
                <p className="text-white" style={{ fontWeight: 700 }}>Model</p>
                <p>YOLOv11s • 95.51% mAP@50</p>
              </div>
              <div>
                <p className="text-white" style={{ fontWeight: 700 }}>Stack</p>
                <p>FastAPI • React • PostgreSQL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="p-10 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="inline-flex bg-[#f1f5f9] rounded-full p-1">
              {(["admin", "user"] as Role[]).map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-4 py-2 rounded-full text-[13px] ${role === r ? "bg-white shadow-sm text-[#0f172a]" : "text-[#6b7280]"}`}
                  style={{ fontWeight: 700 }}
                >
                  {r === "admin" ? "Admin" : "User"}
                </button>
              ))}
            </div>
            <div className="inline-flex bg-[#f1f5f9] rounded-full p-1">
              {(["login", "signup"] as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 rounded-full text-[13px] ${mode === m ? "bg-white shadow-sm text-[#0f172a]" : "text-[#6b7280]"}`}
                  style={{ fontWeight: 700 }}
                >
                  {m === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[13px] text-[#374151]" style={{ fontWeight: 700 }}>Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] text-[#374151]" style={{ fontWeight: 700 }}>Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>
            {error && <p className="text-red-500 text-[13px]">{error}</p>}
            {!error && (
              <p className="text-[12px] text-[#6b7280]">
                Accounts are saved securely in the database. Use your credentials to sign in.
              </p>
            )}
            <Button type="submit" className="w-full h-11 bg-[#3498db] text-white hover:bg-[#2980b9]" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </Button>
            <button
              type="button"
              className="text-[12px] text-[#6b7280] hover:text-[#0f172a]"
              onClick={() => onNavigate("home")}
            >
              Back to Home
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
