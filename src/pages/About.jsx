import { BadgeCheck, Layers3, MonitorSmartphone, Sparkles } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { useProfile } from "../utils/useSiteData";

const points = [
  "Strong experience with Kotlin, XML, and Jetpack Compose based Android applications.",
  "Comfortable with APIs, Firebase, local databases, clean architecture, and Play Console workflows.",
  "Focused on premium UI, organized codebase, and practical mobile user experience."
];

export default function About() {
  const profile = useProfile();

  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionTitle
          label="About Me"
          title="Android developer focused on polished apps and scalable code"
          description="This portfolio is designed to feel professional, modern, and easy to update from the admin dashboard."
        />

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[38px] border border-slate-200 bg-white p-4 shadow-card">
            <img src={profile.photoUrl} alt={profile.name} className="h-full w-full rounded-[30px] object-cover" />
          </div>

          <div className="rounded-[38px] border border-slate-200 bg-white p-7 shadow-soft md:p-10">
            <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-primary">
              {profile.role}
            </span>
            <h2 className="mt-5 text-4xl font-black text-ink">{profile.name}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{profile.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Metric value={profile.years} label="Experience" icon={<Sparkles size={18} />} />
              <Metric value={profile.apps} label="Apps Built" icon={<MonitorSmartphone size={18} />} />
              <Metric value={profile.clients} label="Clients" icon={<Layers3 size={18} />} />
            </div>

            <div className="mt-8 space-y-4">
              {points.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="mt-0.5 text-primary"><BadgeCheck size={20} /></div>
                  <p className="leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>

            <a href={`mailto:${profile.email}`} className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-bold text-white">
              Contact: {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label, icon }) {
  return (
    <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5 text-center">
      <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-2xl bg-white text-primary shadow-sm">{icon}</div>
      <p className="text-2xl font-black text-ink">{value}</p>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
    </div>
  );
}
