import clsx from "clsx";
import Link from "next/link";

function TechnologyFilterOption({ slug, name, activeTechnology }) {
  const isActive = slug === activeTechnology;
  const urlSuffix = !slug ? "" : `/${slug}`;
  const linkClassName = clsx(
    "block text-center px-4 py-1 text-lg",
    "rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-500",
    isActive && "bg-yellow-300 dark:bg-yellow-600"
  );

  return (
    <li className="inline-block">
      <Link href={`/projects${urlSuffix}`}>
        <a className={linkClassName}>{name}</a>
      </Link>
    </li>
  );
}

function Separator() {
  return (
    <li className="inline-block">
      <div className="text-center px-2 py-1 text-lg text-gray-400">&bull;</div>
    </li>
  );
}

export default function TechnologyFilter({ technologies, activeTechnology = "" }) {
  return (
    <div className="text-center">
      <ul className="space-x-4">
        <TechnologyFilterOption slug="" name="All" activeTechnology={activeTechnology} />

        <Separator />

        <TechnologyFilterOption slug="active" name="Active" activeTechnology={activeTechnology} />
        <TechnologyFilterOption slug="past" name="Past" activeTechnology={activeTechnology} />

        <Separator />

        {technologies.map(({ slug, name }) => (
          <TechnologyFilterOption key={slug} slug={slug} name={name} activeTechnology={activeTechnology} />
        ))}
      </ul>
    </div>
  );
}
