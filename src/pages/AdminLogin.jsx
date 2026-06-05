import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyRound, LockKeyhole } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setError("");
    setStatus("");
    setLoading(true);

    if (!hasFirebaseConfig) {
      if (email === demoAdmin.email && password === demoAdmin.password) {
        localStorage.setItem(DEMO_AUTH_KEY, "true");
        navigate("/admin/dashboard");
        return;
      }
      setError(`Use demo credentials: ${demoAdmin.email} / ${demoAdmin.password}`);
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-16">

      {/* soft background glow */}
      <div className="pointer-events-none absolute top-[-120px] h-[300px] w-[300px] rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[-80px] h-[320px] w-[320px] rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            <KeyRound size={16} className="text-indigo-600" />
            Admin Portal
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Manage your portfolio
          </h1>

          <p className="mt-4 max-w-md text-lg leading-7 text-slate-600">
            Update projects, screenshots, and content in one clean dashboard.
            Built for speed, simplicity, and control.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">
              Demo credentials
            </p>

            <div className="mt-3 space-y-1 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-900">Email:</span> {demoAdmin.email}</p>
              <p><span className="font-semibold text-slate-900">Password:</span> {demoAdmin.password}</p>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Use demo login instantly or connect Firebase for production authentication.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL - LOGIN CARD */}
        <div className="flex items-center justify-center">
          <form
            onSubmit={login}
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <LockKeyhole size={26} />
            </div>

            <h2 className="mt-5 text-center text-2xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-center text-sm text-slate-500">
              Sign in to access your dashboard
            </p>

            <div className="mt-8 space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              {/* STATUS */}
              {status && (
                <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
                  {status}
                </p>
              )}

              {/* ERROR */}
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}