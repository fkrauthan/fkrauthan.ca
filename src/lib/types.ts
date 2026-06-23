export interface MarkdownNode {
  type: string;
  value?: string;
  depth?: number;
  url?: string;
  children?: MarkdownNode[];
  [key: string]: unknown;
}

export interface ProjectLinks {
  website?: string;
  github?: string;
}

export interface ProjectMeta {
  title: string;
  development_start: string;
  in_active_development: boolean;
  technology_base: string;
  technologies: string[];
  links: ProjectLinks;
}

export interface Project {
  slug: string;
  technology_slug: string;
  path: string;
  meta: ProjectMeta;
  markdown: MarkdownNode;
  markdown_summary: MarkdownNode;
}

export interface BaseTechnology {
  name: string;
  slug: string;
}

export interface ProjectsData {
  base_technologies: BaseTechnology[];
  projects: Project[];
}

export interface ProjectTileData {
  slug: string;
  markdown_summary: MarkdownNode;
  meta: ProjectMeta;
}

export interface ProjectsPageData {
  activeTechnology: string;
  technologies: BaseTechnology[];
  projects: ProjectTileData[];
}

export interface OpensourceMeta {
  title: string;
  link_github?: string;
  technology_base: string;
  technologies: string[];
}

export interface OpensourceProject {
  slug: string;
  pos: number;
  meta: OpensourceMeta;
  markdown: MarkdownNode;
}

export interface OpensourceData {
  projects: OpensourceProject[];
}

export interface ResumeRole {
  position: string;
  location?: string;
  technologies?: string[];
  summary: string | null;
  startDate: string;
  endDate: string | null;
}

export interface ResumeWork {
  company: string;
  website: string | null;
  roles: ResumeRole[];
  isCurrent: boolean;
}

export interface ResumeVolunteer {
  organization: string;
  position: string;
  summary: string;
  isCurrent: boolean;
}

export interface ResumeData {
  label: string;
  work: ResumeWork[];
  volunteer: ResumeVolunteer[];
}
