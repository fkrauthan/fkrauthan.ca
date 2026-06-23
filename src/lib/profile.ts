// Single source of truth for the profile facts that are surfaced both in the
// about-me page markup and in the JSON-LD structured data (src/lib/jsonLd.ts).
// Keep this module free of Svelte/component imports — jsonLd.ts imports it and
// runs server-side, so it must stay plain data.

export interface SocialLink {
  /** Stable key used to look up the sidebar icon component. */
  network: string;
  /** Label shown in the sidebar. */
  title: string;
  url: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { network: "GitHub", title: "Github", url: "https://github.com/fkrauthan" },
  { network: "StackOverflow", title: "StackOverflow", url: "https://stackoverflow.com/users/1446262/fkrauthan" },
  { network: "LinkedIn", title: "LinkedIn", url: "https://www.linkedin.com/in/fkrauthan/" },
  { network: "Xing", title: "Xing", url: "https://www.xing.com/profile/Florian_Krauthan" },
  { network: "Mastodon", title: "@fkrauthan", url: "https://mastodon.cogindo.net/@fkrauthan" },
];

export const SKILL_GROUPS: SkillGroup[] = [
  { category: "Kotlin / Java", items: ["Ktor", "Clikt", "Spring Boot", "JSF/JSF2", "EJB3"] },
  { category: "Python", items: ["FastAPI", "SQLAlchemy", "Boto3", "Click"] },
  { category: "Rust", items: ["Serde", "reqwest", "StructOpt"] },
  { category: "PHP", items: ["Symfony", "YiiFramework", "CakePHP"] },
  {
    category: "JavaScript / TypeScript",
    items: [
      "Svelte",
      "SvelteKit",
      "React",
      "React Native",
      "Twitter Bootstrap",
      "tailwindcss",
      "Vite",
      "Webpack 4/5",
      "Node.js",
      "Express.js",
      "AngularJS",
      "jQuery",
    ],
  },
  { category: "AI", items: ["Claude", "Claude Code", "Cursor"] },
  {
    category: "Infrastructure / Hosting / DB",
    items: ["Ansible", "AWS", "Terraform", "Docker", "Kubernetes", "PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "Management Essentials",
    institution: "Harvard Business School Online",
    period: "2022",
  },
  {
    degree: "IT Specialist for Application Development",
    institution: "Vocational school for information technology Munich",
    period: "2009 - 2012",
  },
];

export const LANGUAGES: Language[] = [
  { language: "German", fluency: "Native" },
  { language: "English", fluency: "Fluent" },
];
