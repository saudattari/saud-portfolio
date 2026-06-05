import { ArrowUpRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={project.headerImage}
          alt={project.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/88 px-4 py-2 text-xs font-black text-slate-900 backdrop-blur">
          <Rocket size={14} className="text-primary" />
          {project.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-black text-ink">
          {project.title}
        </h3>

        <p className="mt-3 min-h-[112px] line-clamp-4 leading-7 text-slate-600">
          {project.shortDescription || project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(project.technologies || []).slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-sm font-black text-primary transition hover:gap-3"
          >
            View Project Details
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}