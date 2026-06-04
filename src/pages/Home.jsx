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
    <>
      <section className="relative overflow-hidden bg-hero-radial grid-fade py-14 md:py-20">
        <div className="hero-ring left-[-40px] top-[140px] h-52 w-52 bg-indigo-300" />
        <div className="hero-ring right-[12%] top-[90px] h-56 w-56 bg-cyan-200" />
        <div className="container-custom relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/90 px-4 py-2 text-sm font-bold text-primary shadow-soft">
              <Rocket size={16} /> Available for Android app development projects
            </div>

            <h1 className="mt-6 text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
              {profile.name}
              <span className="mt-3 block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {profile.role}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {profile.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/projects" className="btn-primary">
                Explore Projects <ArrowRight size={18} />
              </Link>
              <Link to="/admin" className="btn-outline">
                Open Admin Dashboard
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard value={profile.years} label="Experience" />
              <StatCard value={profile.apps} label="Apps Built" />
              <StatCard value={profile.clients} label="Clients" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-10 hidden h-36 w-36 rounded-[34px] bg-white/85 p-4 shadow-soft backdrop-blur md:block">
              <div className="mock-icon h-full w-full text-primary">
                <LayoutPanelTop size={46} />
              </div>
            </div>
            <div className="absolute -right-4 bottom-10 hidden h-36 w-36 rounded-[34px] bg-white/85 p-4 shadow-soft backdrop-blur md:block">
              <div className="mock-icon h-full w-full text-cyan-500">
                <BriefcaseBusiness size={46} />
              </div>
            </div>

            <div className="relative rounded-[42px] border border-white/80 bg-white/80 p-4 shadow-card backdrop-blur">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="h-[560px] w-full rounded-[34px] object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-soft backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Main Stack</p>
                <p className="mt-2 text-xl font-black text-ink">Kotlin • XML • Jetpack Compose • Firebase • REST APIs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <SectionTitle
            label="Core Skills"
            title="Everything needed to build premium Android applications"
            description="This portfolio includes modern Android technologies, clean UI implementation, Firebase integration, and real project presentation."
          />

          <div className="flex flex-wrap justify-center gap-3">
            {defaultSkills.map((skill) => (
              <SkillPill key={skill}>{skill}</SkillPill>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="mock-icon mb-5 h-16 w-16 text-primary">{item.icon}</div>
                <h3 className="text-xl font-black text-ink">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="rounded-[38px] bg-slate-950 px-6 py-8 text-white shadow-card md:px-10 md:py-10">
            <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-300">
                  Live Content Management
                </span>
                <h2 className="mt-5 text-3xl font-black md:text-5xl">Manage your work from the admin dashboard</h2>
                <p className="mt-5 max-w-xl leading-8 text-slate-300">
                  Add a new project, project link, header image, screenshots, description, and technologies.
                  You can also update your name, email, profile image, and role from the same admin dashboard.
                </p>
                <Link to="/admin" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-slate-950">
                  Go to Admin <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <MiniPanel title="Profile Settings" text="Update name, role, email, picture, and bio." />
                <MiniPanel title="Projects" text="Add project cards with images, links, and details." />
                <MiniPanel title="Screenshots Gallery" text="Show app UI screenshots on the project detail page." />
                <MiniPanel title="Realtime / Demo Mode" text="Use Firebase for live data or demo mode locally without setup." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <SectionTitle
            label="Featured Work"
            title="Selected Android app projects"
            description="Click any project to see full details, screenshots, technologies, and external app link."
          />

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/projects" className="btn-dark">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </>
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
