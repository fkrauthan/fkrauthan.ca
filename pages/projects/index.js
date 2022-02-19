import Layout from "../../components/layout";
import ProjectTile from "../../components/projects/ProjectTile";
import TechnologyFilter from "../../components/projects/TechnologyFilter";
import SectionHeader from "../../components/resume/SectionHeader";

function getPageTitle(activeTechnology, technologies) {
  if (!activeTechnology) {
    return "Projects";
  }

  if (activeTechnology === "active") {
    return "Active - Projects";
  } else if (activeTechnology === "past") {
    return "Past - Projects";
  } else {
    const technology = technologies.find(({ slug }) => slug === activeTechnology);
    return `${technology.name} - Projects`;
  }
}

function getPageDescription(activeTechnology, technologies) {
  if (!activeTechnology) {
    return "An array of projects done by Florian Krauthan including the full range of development.";
  }

  if (activeTechnology === "active") {
    return "An array of current projects done by Florian Krauthan including the full range of development.";
  } else if (activeTechnology === "past") {
    return "An array of past projects done by Florian Krauthan including the full range of development.";
  } else {
    const technology = technologies.find(({ slug }) => slug === activeTechnology);
    return `An array of projects written in ${technology.name} developed from start to finish.`;
  }
}

export function ProjectsPage({ activeTechnology, technologies, projects }) {
  return (
    <Layout
      pageTitle={getPageTitle(activeTechnology, technologies)}
      pageDescription={getPageDescription(activeTechnology, technologies)}>
      <div className="flex flex-col md:m-12 md:my-8 shadow-2xl">
        <div className="content w-full p-6 sm:p-12">
          <div className="prose dark:prose-invert">
            <SectionHeader title="Projects" />
          </div>

          <blockquote className="my-6 p-4 italic border-l-4 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-500 quote">
            <p>
              All projects listed below are hobby projects only. To see some of my freelance work please head over to{" "}
              <a
                href="https://cogindo.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                cogindo.net
              </a>
              .
            </p>
          </blockquote>

          <div className="mt-6 mb-10">
            <TechnologyFilter technologies={technologies} activeTechnology={activeTechnology} />
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(
              ({
                slug,
                markdown_summary,
                meta: { title, development_start, in_active_development, technology_base, technologies, links },
              }) => (
                <ProjectTile
                  key={slug}
                  title={title}
                  summary={markdown_summary}
                  developmentStart={development_start}
                  isActive={in_active_development}
                  technologies={technologies}
                  baseTechnology={technology_base}
                  links={links}
                />
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectsPage;

export async function getStaticProps({ params: { technology } = {} }) {
  const { loadProjectsData } = await require("../../lib/projects");
  const data = await loadProjectsData(technology);

  return {
    props: {
      technologies: data.base_technologies,
      projects: data.projects.map(
        ({
          slug,
          markdown_summary,
          meta: { title, development_start, in_active_development, technology_base, technologies, links = {} },
        }) => ({
          slug,
          markdown_summary,
          meta: {
            title,
            development_start,
            in_active_development,
            technology_base,
            technologies,
            links,
          },
        })
      ),

      activeTechnology: technology || "",
    },
  };
}
