import LogoGithub from "react-ionicons/lib/LogoGithub";

import MarkdownRenderer from "../components/MarkdownRenderer";
import Layout from "../components/layout";
import SectionHeader from "../components/resume/SectionHeader";

import styles from "./opensource.module.css";

function Project({ title, markdown, github, baseTechnology, technologies }) {
  const finalTitle = title.replace("/", " / ");

  return (
    <div className="p-4 rounded bg-gray-50">
      <div className="flex justify-between">
        <div className="prose">
          <h3 style={{ marginBottom: 0 }}>
            {github && (
              <a href={github} style={{ textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
                {finalTitle}
              </a>
            )}
            {!github && <span>{finalTitle}</span>}
          </h3>
          <small>
            {[baseTechnology, ...technologies].map((technology, index) => (
              <span key={technology}>
                {index > 0 && ", "}
                {technology}
              </span>
            ))}
          </small>
        </div>
        <div className="pl-2">
          {github && (
            <a
              href={github}
              style={{ textDecoration: "none" }}
              className="inline-block border p border-yellow-500 rounded-full border-opacity-0 hover:border-opacity-100"
              title={`${finalTitle} GitHub`}
              target="_blank"
              rel="noopener noreferrer">
              <LogoGithub width="32px" height="32px" />
            </a>
          )}
        </div>
      </div>

      <div className={`prose ${styles.markdown} mt-3`}>
        <MarkdownRenderer ast={markdown} />
      </div>
    </div>
  );
}

export function OpensourcePage({ projects }) {
  return (
    <Layout
      pageTitle="Open-source"
      pageDescription="An assortment of Opensource contributions made by Florian Krauthan to improve and fix cool opensource apps and libraries.">
      <div className="flex flex-col md:m-12 md:my-8 shadow-2xl">
        <div className="content w-full p-6 sm:p-12">
          <div className="prose">
            <SectionHeader title="Open-source Contributions" />
          </div>

          <blockquote className="my-6 p-4 italic border-l-4 bg-gray-100 text-gray-600 border-gray-500 quote">
            <p>The following page lists a couple of my open-source contributions over the years.</p>
          </blockquote>

          <div className="mb-10">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {projects.map(({ slug, markdown, meta: { title, link_github, technology_base, technologies } }) => (
                <Project
                  key={slug}
                  title={title}
                  markdown={markdown}
                  github={link_github}
                  baseTechnology={technology_base}
                  technologies={technologies}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OpensourcePage;

export async function getStaticProps() {
  const { loadOpensourceData } = await require("../lib/opensource");
  const data = await loadOpensourceData();

  return {
    props: {
      ...data,
    },
  };
}
