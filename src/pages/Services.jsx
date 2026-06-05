import {
  Bug,
  CloudCog,
  Code2,
  Rocket,
  Smartphone,
  WandSparkles,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

const services = [
  {
    icon: Smartphone,
    title: "Android App Development",
    description:
      "Full Android development using Kotlin, Jetpack Compose, XML, Firebase, and scalable architecture patterns.",
  },
  {
    icon: Code2,
    title: "API Integration",
    description:
      "REST API integration with Retrofit, authentication flows, JSON parsing, and production-ready error handling.",
  },
  {
    icon: WandSparkles,
    title: "Modern UI Implementation",
    description:
      "Clean, reusable UI components with Material Design principles and polished user experience.",
  },
  {
    icon: CloudCog,
    title: "Firebase Integration",
    description:
      "Authentication, Firestore, Storage, real-time sync, and backend cloud workflows.",
  },
  {
    icon: Bug,
    title: "Bug Fixing & Optimization",
    description:
      "Fix crashes, improve performance, refactor architecture, and optimize Android apps.",
  },
  {
    icon: Rocket,
    title: "Launch & Deployment",
    description:
      "Play Store publishing, release builds, signing, and production deployment support.",
  },
];

export default function Services() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-custom">

        <SectionTitle
          label="Services"
          title="What I can build for you"
          description="End-to-end Android development services from idea to production-ready apps."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {services.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* ICON */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>

                {/* subtle bottom line accent */}
                <div className="mt-6 h-[2px] w-10 rounded-full bg-slate-100 transition group-hover:w-16 group-hover:bg-indigo-200" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}