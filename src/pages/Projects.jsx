import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import { useProjects } from "../utils/useSiteData";

export default function Projects() {
  const projects = useProjects();

  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionTitle
          label="Portfolio"
          title="Android application projects"
          description="Each project includes a proper header visual, technologies, app description, and a separate screenshots gallery page."
        />

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
