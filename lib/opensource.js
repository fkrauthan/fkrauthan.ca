import { promises as fs } from "fs";
import path from "path";

import { parseMarkdown } from "./markdown";

const yaml = require("js-yaml");

const dataOpensourcePath = path.join(process.cwd(), "data", "opensource");

async function findAllOpensourceProjects() {
  return (await fs.readdir(dataOpensourcePath)).filter((file) => file.endsWith(".md"));
}

async function getOpenSourceData(file) {
  const dataProjectPath = path.join(dataOpensourcePath, file);
  const fileContent = await fs.readFile(dataProjectPath, "utf8");

  const [, metaRaw, content] = /^---\n((?:^[^-].+\n)+)---\n?((?:.*\n*)*)$/gm.exec(fileContent);
  const [, pos, slug] = /^(\d+)-(.+)\.md$/.exec(file);

  const meta = yaml.load(metaRaw);
  const markdown = await parseMarkdown(content);

  return {
    slug,
    pos: parseInt(pos, 10),

    meta,
    markdown,
  };
}

export async function loadOpensourceData() {
  const projectFiles = await findAllOpensourceProjects();
  const data = await Promise.all(projectFiles.map((file) => getOpenSourceData(file)));

  return {
    projects: data.sort(({ pos: posA }, { pos: posB }) => posB - posA),
  };
}
