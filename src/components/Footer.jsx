import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "../utils/useSiteData";

export default function Footer() {
  const profile = useProfile();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-custom py-12 md:py-14">

        {/* MAIN GRID */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Sparkles size={20} />
              </div>

              <div>
                <p className="text-lg font-black text-slate-900">
                  Mohammad Saud
                </p>
                <p className="text-sm text-slate-500">
                  Android Developer
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Building clean, scalable Android apps using Kotlin, Jetpack Compose,
              Firebase, and modern architecture patterns.
            </p>

            <div className="mt-5 flex gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Portfolio <ArrowUpRight size={16} />
              </Link>

              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Navigation
            </h4>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link className="text-slate-600 hover:text-slate-900" to="/about">
                About
              </Link>
              <Link className="text-slate-600 hover:text-slate-900" to="/projects">
                Projects
              </Link>
              <Link className="text-slate-600 hover:text-slate-900" to="/services">
                Services
              </Link>
              <Link className="text-slate-600 hover:text-slate-900" to="/contact">
                Contact
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Contact
            </h4>

            <a
              href={`mailto:${profile.email}`}
              className="mt-4 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
              <Mail size={16} />
              {profile.email}
            </a>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Available for freelance Android development & UI/UX implementation.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Mohammad Saud. All rights reserved.
          </p>

          <p className="text-xs text-slate-400">
            Built with React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}