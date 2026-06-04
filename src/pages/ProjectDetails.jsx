import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProjects } from "../utils/useSiteData";

export default function ProjectDetails() {
  const { id } = useParams();
  const projects = useProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-lg font-bold text-slate-700">Project not found.</p>
            <Link to="/projects" className="mt-4 inline-flex text-primary font-bold">Back to projects</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-20">
      <div className="container-custom">
        <Link to="/projects" className="mb-8 inline-flex items-center gap-2 font-bold text-slate-600 hover:text-primary">
          <ArrowLeft size={18} /> Back to Projects
        </Link>

        <div className="overflow-hidden rounded-[38px] border border-slate-200 bg-white shadow-card">
          <img src={project.headerImage} alt={project.title} className="h-[360px] w-full object-cover md:h-[460px]" />
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-black text-primary">{project.category}</span>
              {project.featured && <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-700">Featured</span>}
            </div>

            <h1 className="mt-5 text-4xl font-black text-ink md:text-5xl">{project.title}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(project.technologies || []).map((tech) => (
                <span key={tech} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                  {tech}
                </span>
              ))}
            </div>

            {project.appLink && (
              <a
                href={project.appLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white"
              >
                Open Project Link <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-black text-ink">App Screenshots</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(project.screenshots || []).map((image, index) => (
              <div key={`${image}-${index}`} className="phone-shot">
                <img src={image} alt={`${project.title} screenshot ${index + 1}`} className="h-[560px] w-full rounded-[22px] object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
