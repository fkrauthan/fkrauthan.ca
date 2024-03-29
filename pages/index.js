import clsx from "clsx";
import Link from "next/link";

import Layout from "../components/Layout";

import styles from "./index.module.css";

function TechnologyListItem({ title }) {
  return <li className={clsx(styles.list__item, "xl:pl-3")}>{title}</li>;
}

function TechnologyList({ children }) {
  return (
    <span className={clsx(styles.container, "block font-light text-browngray text-2xl my-6")}>
      <ul className={styles.list}>{children}</ul>
    </span>
  );
}

function HomePageContent() {
  return (
    <>
      <div className="flex flex-col justify-center h-full py-12">
        <div className="self-center items-center flex flex-col sm:flex-row w-full md:w-5/6 xl:w-2/3 px-4 sm:px-0">
          <div className="w-full text-center sm:text-left sm:w-1/2 py-12 sm:px-8">
            <h1 className="tracking-wide text-yellow-500 text-2xl mb-6">
              Welcome:{" "}
              <span className="text-gray-800 dark:text-gray-400 font-bold tracking tracking-widest">and hello</span>
            </h1>
            <h2 className="font-bold tracking-widest text-4xl">I speak...</h2>
            <TechnologyList>
              <TechnologyListItem title="English" />
              <TechnologyListItem title="German" />
              <TechnologyListItem title="Rust" />
              <TechnologyListItem title="Kotlin/Java" />
              <TechnologyListItem title="JavaScript" />
              <TechnologyListItem title="PHP" />
              <TechnologyListItem title="Kubernetes/Docker" />
            </TechnologyList>
            <p className="font-bold tracking-widest text-4xl">...what about you!</p>
          </div>
          <div className="w-full sm:w-1/2">
            <img src="/img/fkrauthan-cartoon.jpg" alt="Portrait of Florian Krauthan" className="rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center pb-12">
        <Link
          href="/about-me"
          className="px-10 py-2 bg-yellow-500 dark:bg-yellow-600 dark:hover:border-red dark:hover:bg-yellow-500 text-center rounded-full shadow-md text-lg hover:bg-yellow-100 hover:border-red mx-2">
          Get to know me
        </Link>

        <Link
          href="/projects"
          className="px-10 py-2 bg-yellow-500 dark:bg-yellow-600 dark:hover:border-red dark:hover:bg-yellow-500 text-center rounded-full shadow-md text-lg hover:bg-yellow-100 hover:border-red mx-2">
          See what I can do
        </Link>
      </div>
    </>
  );
}

function HomePage() {
  return (
    <Layout
      pageTitle="Welcome"
      pageDescription="Florian Krauthan, a Vancouver based software developer, who loves to eat, breathe and sleep technology to make the world a better place."
      headerContent={<HomePageContent />}
      headerClassName={clsx(styles.header, "dark:bg-none dark:opacity-100 dark:bg-slate-900")}
      hideTopNavigation
    />
  );
}

export default HomePage;
