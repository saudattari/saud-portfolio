import { useState, useEffect } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProjects } from "../utils/useSiteData";

export default function ProjectDetails() {
  const { id } = useParams();
  const projects = useProjects();

  const [selectedImage, setSelectedImage] = useState(null);

  const project = projects.find((item) => item.id === id);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!project) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-lg font-bold text-slate-700">
              Project not found.
            </p>

            <Link
              to="/projects"
              className="mt-4 inline-flex text-primary font-bold"
            >
              Back to projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-20">
      <div className="container-custom">
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 font-bold text-slate-600 hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        <div className="overflow-hidden rounded-[38px] border border-slate-200 bg-white shadow-card">
          <img
            src={project.headerImage}
            alt={project.title}
            onClick={() => setSelectedImage(project.headerImage)}
            className="h-[360px] w-full cursor-pointer object-cover transition duration-300 hover:opacity-95 md:h-[460px]"
          />

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-black text-primary">
                {project.category}
              </span>

              {project.featured && (
                <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-700">
                  Featured
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-black text-ink md:text-5xl">
              {project.title}
            </h1>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(project.technologies || []).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700"
                >
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
                Open Project Link
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-black text-ink">
            App Screenshots
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(project.screenshots || []).map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="phone-shot overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                  className="h-[560px] w-full cursor-pointer rounded-[22px] object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-6 top-6 text-5xl font-bold text-white hover:opacity-70"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[95vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}