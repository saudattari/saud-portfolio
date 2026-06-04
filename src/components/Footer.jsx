import { ArrowUpRight, Mail, Smartphone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "../utils/useSiteData";

export default function Footer() {
  const profile = useProfile();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-custom py-16">
        <div className="grid gap-10 rounded-[34px] bg-slate-950 px-6 py-8 text-white shadow-card md:grid-cols-[1.15fr_0.85fr_0.8fr] md:px-10 md:py-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-cyan-300">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="text-xl font-black">Mohammad Saud</p>
                <p className="text-sm text-slate-300">Modern Android App Developer</p>
              </div>
            </div>
            <p className="max-w-xl leading-7 text-slate-300">
              I design and build premium Android apps with Kotlin, XML, Jetpack Compose,
              Firebase, APIs, Room, and scalable architecture.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-slate-950">
                View Portfolio <ArrowUpRight size={16} />
              </Link>
              <Link to="/admin" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-bold text-white">
                Open Admin
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black">Quick Links</h4>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              <Link to="/about">About</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black">Contact</h4>
            <a href={`mailto:${profile.email}`} className="mt-5 flex items-center gap-3 text-sm text-slate-300">
              <Mail size={18} />
              {profile.email}
            </a>
            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/20 text-cyan-300">
                  <Smartphone size={20} />
                </div>
                <div>
                  <p className="font-bold">Android Portfolio</p>
                  <p className="text-xs text-slate-400">Admin + Realtime project showcase</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Mohammad Saud. Built for modern Android app showcasing.
        </p>
      </div>
    </footer>
  );
}
