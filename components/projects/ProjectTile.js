import GlobeOutline from "react-ionicons/lib/GlobeOutline";
import LogoGithub from "react-ionicons/lib/LogoGithub";

import ActivePill from "../ActivePill";
import MarkdownRenderer from "../MarkdownRenderer";

export function TechnologyItem({ title }) {
  return (
    <>
      <span className="rounded-xl bg-gray-300 px-3 whitespace-nowrap mx-0.5 text-xs">{title}</span>{" "}
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
    <div className="block rounded-md border p-5 hover:bg-yellow-100 flex flex-col">
      <div className="flex justify-between mb-3">
        <div className="prose">
          <h3 style={{ marginBottom: 0 }}>
            {title} <sup className="text-sm text-gray-500">{baseTechnology}</sup>
          </h3>
          <small>Started {startYear}</small>
        </div>
        <div>
          <ActivePill active={isActive} />
        </div>
      </div>

      <div className="prose">
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
              {website && (
                <a
                  href={website}
                  style={{ textDecoration: "none" }}
                  className="inline-block border p border-yellow-500 rounded-full border-opacity-0 hover:border-opacity-100"
                  title={`${title} Project Website`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <GlobeOutline width="32px" height="32px" />
                </a>
              )}

              {github && (
                <a
                  href={github}
                  style={{ textDecoration: "none" }}
                  className="inline-block border p border-yellow-500 rounded-full border-opacity-0 hover:border-opacity-100"
                  title={`${title} GitHub`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <LogoGithub width="32px" height="32px" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
