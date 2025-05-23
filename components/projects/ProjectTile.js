import GlobeOutline from "~icons/ion/globe-outline";
import LogoGithub from "~icons/ion/logo-github";

import ActivePill from "../ActivePill";
import MarkdownRenderer from "../MarkdownRenderer";
import ProjectLink from "./ProjectLink";

export function TechnologyItem({ title }) {
  return (
    <>
      <span className="rounded-xl bg-gray-300 dark:bg-gray-800 px-3 whitespace-nowrap mx-0.5 text-xs py-0.5">
        {title}
      </span>{" "}
    </>
  );
}

export default function ProjectTile({
  title,
  summary,
  developmentStart,
  isActive,
  baseTechnology,
  technologies,
  links: { github, website },
}) {
  const startYear = new Date(developmentStart).getFullYear();

  return (
    <div className="block rounded-md border p-5 bg-gray-50 dark:border-0 dark:bg-neutral-900 flex flex-col">
      <div className="flex justify-between mb-3">
        <div className="prose dark:prose-invert">
          <h3 style={{ marginBottom: 0 }}>
            {title} <sup className="text-sm text-gray-500 dark:text-gray-400">{baseTechnology}</sup>
          </h3>
          <small>Started {startYear}</small>
        </div>
        <div>
          <ActivePill active={isActive} />
        </div>
      </div>

      <div className="prose dark:prose-invert">
        <MarkdownRenderer ast={summary} />
      </div>

      <div className="flex-1" />
      <div className="mt-5 flex-none">
        <div className="flex-none">
          <div className="flex">
            <div className="flex-1 self-center" style={{ minHeight: "32px" }}>
              <TechnologyItem title={baseTechnology} />
              {technologies.map((technology) => (
                <TechnologyItem key={technology} title={technology} />
              ))}
            </div>
            <div className="flex-none self-end">
              {website && <ProjectLink href={website} title={`${title} Project Website`} icon={GlobeOutline} />}
              {github && <ProjectLink href={github} title={`${title} GitHub`} icon={LogoGithub} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
