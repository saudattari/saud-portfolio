import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyRound, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { demoAdmin } from "../data/defaultData";
import { auth, hasFirebaseConfig } from "../services/firebase";

const DEMO_AUTH_KEY = "portfolio_admin_logged_in";

export default function AdminLogin() {
  const [email, setEmail] = useState(demoAdmin.email);
  const [password, setPassword] = useState(demoAdmin.password);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setError("");
    setStatus("Logging in...");

    if (!hasFirebaseConfig) {
      if (email === demoAdmin.email && password === demoAdmin.password) {
        localStorage.setItem(DEMO_AUTH_KEY, "true");
        setStatus("Demo login successful.");
        navigate("/admin/dashboard");
        return;
      }
      setStatus("");
      setError(`Use demo credentials: ${demoAdmin.email} / ${demoAdmin.password}`);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setStatus("Login successful.");
      navigate("/admin/dashboard");
    } catch (err) {
      setStatus("");
      setError(err?.message || "Login failed");
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container-custom grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[36px] bg-slate-950 p-8 text-white shadow-card md:p-10">
          <div className="mock-icon mb-6 h-16 w-16 text-cyan-300">
            <Sparkles size={28} />
          </div>
          <h1 className="text-4xl font-black">Admin Access</h1>
          <p className="mt-5 leading-8 text-slate-300">
            Use the admin area to update profile details, change the main image,
            add or edit projects, upload screenshots, and keep your portfolio fresh.
          </p>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3 text-cyan-300">
              <KeyRound size={20} />
              <p className="font-bold">Default demo login</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p><span className="font-bold text-white">Email:</span> {demoAdmin.email}</p>
              <p><span className="font-bold text-white">Password:</span> {demoAdmin.password}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Demo mode works instantly if Firebase is not configured. For live deployment,
              create your own admin user inside Firebase Authentication.
            </p>
          </div>

          <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
            <p className="font-bold text-white">Why buttons may not show before:</p>
            <p className="mt-2">If Firebase was not configured or login was not completed, the dashboard actions would not work properly. This new version includes a demo login so you can test it immediately.</p>
          </div>
        </div>

        <div className="grid place-items-center">
          <form onSubmit={login} className="w-full max-w-xl rounded-[36px] border border-slate-200 bg-white p-8 shadow-soft md:p-10">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[24px] bg-indigo-50 text-primary">
              <LockKeyhole size={28} />
            </div>
            <h2 className="text-center text-3xl font-black text-ink">Login to Dashboard</h2>
            <p className="mt-3 text-center leading-7 text-slate-600">
              Enter admin credentials below. Demo mode is prefilled for easy testing.
            </p>

            <div className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Admin Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="admin-input" required />
              </label>

              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-input" required />
              </label>

              <button className="btn-primary" type="submit">Login to Admin</button>
              {status && <p className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-primary">{status}</p>}
              {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
