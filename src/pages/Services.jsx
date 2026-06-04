import { Bug, CloudCog, Code2, Rocket, Smartphone, WandSparkles } from "lucide-react";
import SectionTitle from "../components/SectionTitle";

const services = [
  {
    icon: <Smartphone size={24} />,
    title: "Android App Development",
    description: "Full Android application development using Kotlin, XML, Jetpack Compose, Material UI, Firebase, and scalable architecture."
  },
  {
    icon: <Code2 size={24} />,
    title: "API Integration",
    description: "Connect Android apps with REST APIs, authentication, JSON data, Retrofit networking, and production-ready handling."
  },
  {
    icon: <WandSparkles size={24} />,
    title: "Modern UI Implementation",
    description: "Beautiful UI screens with proper layout structure, reusable components, and premium visual quality."
  },
  {
    icon: <CloudCog size={24} />,
    title: "Firebase Integration",
    description: "Firebase Authentication, Firestore, Realtime updates, Storage, and cloud-backed app workflows."
  },
  {
    icon: <Bug size={24} />,
    title: "Bug Fixing & Refactoring",
    description: "Fix crashes, improve code quality, optimize architecture, and refactor Android features properly."
  },
  {
    icon: <Rocket size={24} />,
    title: "Launch & Deployment Support",
    description: "Help with Play Console preparation, release builds, store readiness, and app publishing guidance."
  }
];

export default function Services() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionTitle
          label="Services"
          title="What I can build for you"
          description="From idea to publish-ready Android application, I can help with development, design implementation, integration, and improvement."
        />

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item) => (
            <div key={item.title} className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-soft">
              <div className="mock-icon mb-5 h-16 w-16 text-primary">{item.icon}</div>
              <h3 className="text-2xl font-black text-ink">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
