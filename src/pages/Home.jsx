import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Database,
  LayoutPanelTop,
  Palette,
  Rocket,
  Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import SkillPill from "../components/SkillPill";
import { defaultSkills } from "../data/defaultData";
import { useProfile, useProjects } from "../utils/useSiteData";

const highlights = [
  {
    icon: <Smartphone size={22} />,
    title: "Native Android Apps",
    description: "Professional apps with Kotlin, XML, Compose, Firebase, and clean architecture."
  },
  {
    icon: <Palette size={22} />,
    title: "Modern Interface",
    description: "Premium looking UI with polished cards, gradients, animations, and user-friendly flows."
  },
  {
    icon: <Database size={22} />,
    title: "Realtime Admin",
    description: "Projects, profile data, and screenshots can be added from the admin panel."
  },
  {
    icon: <Code2 size={22} />,
    title: "Production Ready Code",
    description: "Scalable structures using MVVM, Room, API integration, and maintainable code style."
  }
];

export default function Home() {
  const profile = useProfile();
  const projects = useProjects();
  const featured = projects.filter((item) => item.featured).slice(0, 3);

  return (
    <div className="relative overflow-hidden">

      {/* 🌈 BACKGROUND 3D ORBS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-purple-300 blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-0 h-[350px] w-[350px] rounded-full bg-cyan-300 blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-pink-300 blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative py-24 md:py-28">
        <div className="container-custom grid lg:grid-cols-2 items-center gap-14">

          {/* LEFT */}
          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-5 py-2 border shadow-sm">
              <Rocket size={16} className="text-primary" />
              <span className="text-sm font-bold text-slate-700">
                Available for Android Development
              </span>
            </div>

            <h1 className="mt-6 text-5xl md:text-6xl font-black leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                {profile.name}
              </span>
            </h1>

            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-700">
              {profile.role}
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8 max-w-xl">
              {profile.description}
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="px-6 py-3 rounded-full bg-black text-white font-bold hover:scale-105 transition"
              >
                Explore Projects →
              </Link>

              <Link
                to="/admin"
                className="px-6 py-3 rounded-full border border-slate-300 bg-white/60 backdrop-blur font-bold hover:scale-105 transition"
              >
                Admin Panel
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <GlassStat value={profile.years} label="Years" />
              <GlassStat value={profile.apps} label="Apps" />
              <GlassStat value={profile.clients} label="Clients" />
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="relative z-10">

            {/* FLOATING BADGES */}
            <div className="absolute -top-10 left-10 glass-floating">
              <Smartphone size={28} />
            </div>

            <div className="absolute bottom-10 -right-6 glass-floating">
              <Code2 size={28} />
            </div>

            {/* PROFILE IMAGE CARD */}
            <div className="rounded-[40px] p-3 bg-white/30 backdrop-blur-xl border shadow-2xl hover:scale-[1.02] transition duration-500">
              <img
                src={profile.photoUrl}
                className="rounded-[34px] h-[520px] w-full object-cover"
              />

              <div className="mt-4 rounded-[28px] bg-white/60 backdrop-blur p-5 border">
                <p className="text-xs font-black tracking-[0.2em] text-slate-500">
                  STACK
                </p>
                <p className="mt-2 font-bold text-slate-800">
                  Kotlin • Compose • Firebase • REST API • MVVM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="py-20 relative">
        <div className="container-custom">

          <SectionTitle
            label="Skills"
            title="Modern Android Development Stack"
            description="Everything used to build production-ready mobile applications."
          />

          {/* FLOATING SKILLS */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {defaultSkills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border shadow-sm hover:scale-110 transition text-sm font-bold"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* FEATURE CARDS */}
          <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-[30px] bg-white/70 backdrop-blur border shadow-sm hover:-translate-y-2 transition duration-300"
              >
                <div className="text-primary group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-slate-600 leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ADMIN CTA ================= */}
      <section className="py-20">
        <div className="container-custom">
          <div className="rounded-[40px] p-10 bg-gradient-to-r from-black via-slate-900 to-black text-white shadow-2xl">

            <h2 className="text-4xl font-black">
              Manage Everything in One Dashboard
            </h2>

            <p className="mt-4 text-slate-300 max-w-2xl">
              Add projects, screenshots, technologies, profile updates, and live portfolio content instantly.
            </p>

            <Link
              to="/admin"
              className="inline-flex mt-6 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition"
            >
              Open Admin →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-20">
        <div className="container-custom">

          <SectionTitle
            label="Projects"
            title="Featured Android Applications"
            description="High-quality production apps built with modern Android architecture."
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
            {featured.map((project) => (
              <div
                key={project.id}
                className="group rounded-[30px] overflow-hidden bg-white border shadow-sm hover:-translate-y-2 transition"
              >
                <img
                  src={project.headerImage}
                  className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="p-5">
                  <h3 className="font-black text-lg">{project.title}</h3>
                  <p className="text-sm text-slate-500">{project.category}</p>
                  <p className="mt-3 text-slate-600 text-sm">
                    {project.shortDescription}
                  </p>

                  <Link
                    to="/projects"
                    className="inline-block mt-4 text-sm font-bold text-primary"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function GlassStat({ value, label }) {
  return (
    <div className="rounded-2xl bg-white/60 backdrop-blur border p-4 text-center shadow-sm hover:scale-105 transition">
      <p className="text-2xl font-black text-black">{value}</p>
      <p className="text-xs font-bold text-slate-500">{label}</p>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 text-center shadow-soft">
      <p className="text-3xl font-black text-primary">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
    </div>
  );
}

function MiniPanel({ title, text }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 p-5">
      <div className="mock-icon mb-4 h-12 w-12 text-cyan-300">
        <Code2 size={22} />
      </div>
      <h3 className="text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  );
}
