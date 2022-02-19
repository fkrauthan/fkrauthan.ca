import ProjectsPage, { getStaticProps as originalGetStaticProps } from "./index";

export default ProjectsPage;

export async function getStaticPaths() {
  const { loadProjectsData } = await require("../../lib/projects");
  const data = await loadProjectsData();

  return {
    paths: [
      ...data.base_technologies.map(({ slug }) => ({
        params: { technology: slug },
      })),
      { params: { technology: "active" } },
      { params: { technology: "past" } },
    ],
    fallback: false,
  };
}

export const getStaticProps = originalGetStaticProps;
