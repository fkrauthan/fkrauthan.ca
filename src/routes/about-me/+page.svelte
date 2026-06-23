<script lang="ts">
  import ActivePill from "$lib/components/ActivePill.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import SectionHeader from "$lib/components/resume/SectionHeader.svelte";
  import SkillList from "$lib/components/resume/SkillList.svelte";
  import SkillListItem from "$lib/components/resume/SkillListItem.svelte";
  import SidebarEntry from "$lib/components/resume/sidebar/SidebarEntry.svelte";
  import SidebarLinkEntry from "$lib/components/resume/sidebar/SidebarLinkEntry.svelte";
  import SidebarSection from "$lib/components/resume/sidebar/SidebarSection.svelte";
  import WorkEntry from "$lib/components/resume/work/WorkEntry.svelte";
  import HomeOutline from "~icons/ion/home-outline";
  import LogoGithub from "~icons/ion/logo-github";
  import LogoLinkedin from "~icons/ion/logo-linkedin";
  import LogoMastodon from "~icons/ion/logo-mastodon";
  import LogoStackoverflow from "~icons/ion/logo-stackoverflow";
  import LogoXing from "~icons/ion/logo-xing";
  import MailOutline from "~icons/ion/mail-outline";

  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

{#snippet SkillsSection()}
  <ul class="list-none space-y-1">
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
{/snippet}

{#snippet HobbiesSection(sidebar: boolean)}
  {@const ulClassName = sidebar ? "pl-6" : ""}
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
      <ul class={ulClassName}>
        <li>Battlefield</li>
        <li>Rainbow Six Siege</li>
        <li>many more...</li>
      </ul>
    </li>
  </ul>
{/snippet}

{#snippet Sidebar(label: string)}
  <div
    id="sidebar"
    class="w-full md:max-w-md p-8 bg-gradient-to-b from-yellow-400 dark:from-yellow-800 dark:via-pink-800 dark:to-purple-700 via-pink-900 to-purple-50">
    <div class="px-2 mb-12">
      <div class="w-48 mx-auto mb-2">
        <img src="/img/fkrauthan.jpg" alt="Profile Picture" class="rounded-full w-48 mx-auto mb-2" />
      </div>

      <h1 class="text-center text-3xl font-semibold mb-2">Florian Krauthan</h1>
      <h2 class="text-center text-xl font-light">{label || "Fullstack Developer"}</h2>
    </div>

    <SidebarSection title="Contact">
      <SidebarEntry IconComponent={MailOutline}>
        <a href="mailto:mail@fkrauthan.de" class="hover:text-gray-700">mail@fkrauthan.de</a>
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
        href="https://stackoverflow.com/users/1446262/fkrauthan" />
      <SidebarLinkEntry IconComponent={LogoLinkedin} title="LinkedIn" href="https://www.linkedin.com/in/fkrauthan/" />
      <SidebarLinkEntry IconComponent={LogoXing} title="Xing" href="https://www.xing.com/profile/Florian_Krauthan" />
      <SidebarLinkEntry
        IconComponent={LogoMastodon}
        title="@fkrauthan"
        href="https://mastodon.cogindo.net/@fkrauthan" />
    </SidebarSection>

    <SidebarSection title="Skills &amp; Tools">
      {@render SkillsSection()}
    </SidebarSection>

    <SidebarSection title="Education">
      <div class="space-y-1">
        <div>
          <h3 class="font-semibold">Management Essentials</h3>
          <p>2022 Harvard Business School Online</p>
        </div>

        <div>
          <h3 class="font-semibold">IT Specialist for Application Development</h3>
          <p>2009 - 2012 Vocational school for information technology Munich</p>
        </div>
      </div>
    </SidebarSection>

    <SidebarSection title="Languages">
      <h3 class="font-semibold">German</h3>
      <p>Native</p>
      <h3 class="font-semibold">English</h3>
      <p>Fluent</p>
    </SidebarSection>

    <div class="hidden md:block">
      <SidebarSection title="Hobbies">
        {@render HobbiesSection(true)}
      </SidebarSection>
    </div>
  </div>
{/snippet}

{#snippet MainSection(work: PageData["work"], volunteer: PageData["volunteer"])}
  <div class="content w-full p-6 sm:p-12">
    <div id="profile" class="prose dark:prose-invert max-w-none">
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
    <hr class="mt-8 mb-12" />
    <div id="experience" class="prose dark:prose-invert">
      <SectionHeader title="Experience" />

      {#each work as { company, website, isCurrent, roles }}
        <WorkEntry {company} {website} {roles} {isCurrent} />
      {/each}
    </div>

    <hr class="mt-8 mb-12" />

    <div id="projects" class="prose dark:prose-invert">
      <SectionHeader title="Volunteer work" />
      <div class="mb-16">
        <ul>
          {#each volunteer as { organization, position, summary, isCurrent }}
            <li>
              <strong>{position} @ {organization}</strong>
              <ActivePill active={isCurrent} />
              <p style="margin-top: 0;">{summary}</p>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="block md:hidden">
      <hr class="mt-8 mb-12" />

      <div id="projects" class="prose dark:prose-invert max-w-none">
        <SectionHeader title="Hobbies" />

        {@render HobbiesSection(false)}
      </div>
    </div>
  </div>
{/snippet}

<Layout
  pageTitle="About me"
  pageDescription="Learn more about Florian Krauthan, including but not limited to background, skills and interests">
  <div class="flex flex-col md:flex-row-reverse md:m-12 md:my-8 shadow-2xl">
    {@render Sidebar(data.label)}
    {@render MainSection(data.work, data.volunteer)}
  </div>
</Layout>
