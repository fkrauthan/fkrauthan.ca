import HomeOutline from "~icons/ion/home-outline";
import LogoGithub from "~icons/ion/logo-github";
import LogoLinkedin from "~icons/ion/logo-linkedin";
import LogoMastodon from "~icons/ion/logo-mastodon";
import LogoStackoverflow from "~icons/ion/logo-stackoverflow";
import LogoXing from "~icons/ion/logo-xing";
import MailOutline from "~icons/ion/mail-outline";

import ActivePill from "../components/ActivePill";
import Layout from "../components/Layout";
import SectionHeader from "../components/resume/SectionHeader";
import SkillList, { SkillListItem } from "../components/resume/SkillList";
import SidebarEntry from "../components/resume/sidebar/SidebarEntry";
import SidebarLinkEntry from "../components/resume/sidebar/SidebarLinkEntry";
import SidebarSection from "../components/resume/sidebar/SidebarSection";
import WorkEntry from "../components/resume/work/WorkEntry";

function SkillsSection() {
  return (
    <ul className="list-none space-y-1">
      <SkillList title="Kotlin / Java">
        <SkillListItem title="Ktor" />
        <SkillListItem title="Clikt" />
        <SkillListItem title="Spring Boot" />
        <SkillListItem title="JSF/JSF2" />
        <SkillListItem title="EJB3" />
      </SkillList>

      <SkillList title="Python">
        <SkillListItem title="FastAPI" />
        <SkillListItem title="SQLAlchemy" />
        <SkillListItem title="Boto3" />
        <SkillListItem title="Click" />
      </SkillList>

      <SkillList title="Rust">
        <SkillListItem title="Serde" />
        <SkillListItem title="reqwest" />
        <SkillListItem title="StructOpt" />
      </SkillList>

      <SkillList title="PHP">
        <SkillListItem title="Symfony" />
        <SkillListItem title="YiiFramework" />
        <SkillListItem title="CakePHP" />
      </SkillList>

      <SkillList title="JavaScript / TypeScript">
        <SkillListItem title="Svelte" />
        <SkillListItem title="SvelteKit" />
        <SkillListItem title="React" />
        <SkillListItem title="React Native" />
        <SkillListItem title="Twitter Bootstrap" />
        <SkillListItem title="tailwindcss" />
        <SkillListItem title="Vite" />
        <SkillListItem title="Webpack 4/5" />
        <SkillListItem title="Node.js" />
        <SkillListItem title="Express.js" />
        <SkillListItem title="AngularJS" />
        <SkillListItem title="jQuery" />
      </SkillList>

      <SkillList title="AI">
        <SkillListItem title="Claude" />
        <SkillListItem title="Claude Code" />
        <SkillListItem title="Cursor" />
      </SkillList>

      <SkillList title="Infrastructure / Hosting / DB">
        <SkillListItem title="Ansible" />
        <SkillListItem title="AWS" />
        <SkillListItem title="Terraform" />
        <SkillListItem title="Docker" />
        <SkillListItem title="Kubernetes" />
        <SkillListItem title="PostgreSQL" />
        <SkillListItem title="MySQL" />
        <SkillListItem title="MongoDB" />
        <SkillListItem title="SQLite" />
      </SkillList>
    </ul>
  );
}

function HobbiesSection({ sidebar }) {
  const ulClassName = sidebar ? "pl-6" : "";

  return (
    <ul>
      <li>Flying single engine planes</li>
      <li>Biking</li>
      <li>Sailing</li>
      <li>Windsurfing</li>

      <li>Skiing</li>
      <li>Programming</li>
      <li>3D Printing</li>
      <li>Reading fiction books</li>

      <li>
        Playing video games
        <ul className={ulClassName}>
          <li>Battlefield</li>
          <li>Rainbow Six Siege</li>
          <li>many more...</li>
        </ul>
      </li>
    </ul>
  );
}

function Sidebar({ label }) {
  return (
    <div
      id="sidebar"
      className="w-full md:max-w-md p-8 bg-gradient-to-b from-yellow-400 dark:from-yellow-800 dark:via-pink-800 dark:to-purple-700 via-pink-900 to-purple-50">
      <div className="px-2 mb-12">
        <div className="w-48 mx-auto mb-2">
          <img src="/img/fkrauthan.jpg" alt="Profile Picture" className="rounded-full w-48 mx-auto mb-2" />
        </div>

        <h1 className="text-center text-3xl font-semibold mb-2">Florian Krauthan</h1>
        <h2 className="text-center text-xl font-light">{label || "Fullstack Developer"}</h2>
      </div>

      <SidebarSection title="Contact">
        <SidebarEntry IconComponent={MailOutline}>
          <a href="mailto:mail@fkrauthan.de" className="hover:text-gray-700">
            mail@fkrauthan.de
          </a>
        </SidebarEntry>
        <SidebarEntry IconComponent={HomeOutline}>
          <div>
            <p>Burnaby</p>
            <p>British Columbia</p>
          </div>
        </SidebarEntry>
      </SidebarSection>

      <SidebarSection title="On the Web">
        <SidebarLinkEntry IconComponent={LogoGithub} title="Github" href="https://github.com/fkrauthan" />
        <SidebarLinkEntry
          IconComponent={LogoStackoverflow}
          title="StackOverflow"
          href="https://stackoverflow.com/users/1446262/fkrauthan"
        />
        <SidebarLinkEntry IconComponent={LogoLinkedin} title="LinkedIn" href="https://www.linkedin.com/in/fkrauthan/" />
        <SidebarLinkEntry IconComponent={LogoXing} title="Xing" href="https://www.xing.com/profile/Florian_Krauthan" />
        <SidebarLinkEntry
          IconComponent={LogoMastodon}
          title="@fkrauthan"
          href="https://mastodon.cogindo.net/@fkrauthan"
        />
      </SidebarSection>

      <SidebarSection title="Skills &amp; Tools">
        <SkillsSection />
      </SidebarSection>

      <SidebarSection title="Education">
        <div className="space-y-1">
          <div>
            <h3 className="font-semibold">Management Essentials</h3>
            <p>2022 Harvard Business School Online</p>
          </div>

          <div>
            <h3 className="font-semibold">IT Specialist for Application Development</h3>
            <p>2009 - 2012 Vocational school for information technology Munich</p>
          </div>
        </div>
      </SidebarSection>

      <SidebarSection title="Languages">
        <h3 className="font-semibold">German</h3>
        <p>Native</p>
        <h3 className="font-semibold">English</h3>
        <p>Fluent</p>
      </SidebarSection>

      <div className="hidden md:block">
        <SidebarSection title="Hobbies">
          <HobbiesSection sidebar />
        </SidebarSection>
      </div>
    </div>
  );
}

function MainSection({ work, volunteer }) {
  return (
    <div className="content w-full p-6 sm:p-12">
      <div id="profile" className="prose dark:prose-invert max-w-none">
        <SectionHeader title="Profile" />

        <p>
          I&apos;m a self-taught developer focusing on making the payment world a better place. I&apos;m experienced in
          frontend frameworks like React as well as backend frameworks like ktor and Spring Boot. Working both on
          frontends, backends as well as mobile apps I can truly say I am a developer that lives and breathes the full
          development lifecycle.
        </p>
        <p>
          I am highly motivated in expanding my horizons day by day for better performance, user experience and cool new
          technologies.
        </p>
      </div>
      <hr className="mt-8 mb-12" />
      <div id="experience" className="prose dark:prose-invert">
        <SectionHeader title="Experience" />

        {work.map(({ company, website, isCurrent, roles }, i) => (
          <WorkEntry key={i} company={company} website={website} roles={roles} isCurrent={isCurrent} />
        ))}
      </div>

      <hr className="mt-8 mb-12" />

      <div id="projects" className="prose dark:prose-invert">
        <SectionHeader title="Volunteer work" />
        <div className="mb-16">
          <ul>
            {volunteer.map(({ organization, position, summary, isCurrent }) => (
              <li key={organization}>
                <strong>
                  {position} @ {organization}
                </strong>{" "}
                <ActivePill active={isCurrent} />
                <p style={{ marginTop: "0" }}>{summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="block md:hidden">
        <hr className="mt-8 mb-12" />

        <div id="projects" className="prose dark:prose-invert max-w-none">
          <SectionHeader title="Hobbies" />

          <HobbiesSection />
        </div>
      </div>
    </div>
  );
}

function AboutMePage({ label, work, volunteer }) {
  return (
    <Layout
      pageTitle="About me"
      pageDescription="Learn more about Florian Krauthan, including but not limited to background, skills and interests">
      <div className="flex flex-col md:flex-row-reverse md:m-12 md:my-8 shadow-2xl">
        <Sidebar label={label} />
        <MainSection work={work} volunteer={volunteer} />
      </div>
    </Layout>
  );
}

export default AboutMePage;

export async function getStaticProps(context) {
  const { loadResumeData } = require("../lib/resume");
  const data = await loadResumeData();

  return {
    props: {
      ...data,
    },
  };
}
