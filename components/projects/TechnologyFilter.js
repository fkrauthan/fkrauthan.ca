import clsx from "clsx";
import Link from "next/link";

function TechnologyFilterOption({ slug, name, activeTechnology }) {
  const isActive = slug === activeTechnology;
  const urlSuffix = !slug ? "" : `/${slug}`;
  const linkClassName = clsx(
    "block text-center px-4 py-1 text-lg",
    "rounded-md hover:bg-yellow-100",
    isActive && "bg-yellow-300"
  );

  return (
    <div>
      <Link href={`/projects${urlSuffix}`}>
        <a className={linkClassName}>{name}</a>
      </Link>
    </div>
  );
}

function Separator() {
  return <div className="block text-center px-2 py-1 text-lg text-gray-400">&bull;</div>;
}

export default function TechnologyFilter({ technologies, activeTechnology = "" }) {
  return (
    <div className="space-x-4 flex justify-center">
      <TechnologyFilterOption slug="" name="All" activeTechnology={activeTechnology} />

      <Separator />

      <TechnologyFilterOption slug="active" name="Active" activeTechnology={activeTechnology} />
      <TechnologyFilterOption slug="past" name="Past" activeTechnology={activeTechnology} />

      <Separator />

      {technologies.map(({ slug, name }) => (
        <TechnologyFilterOption key={slug} slug={slug} name={name} activeTechnology={activeTechnology} />
      ))}
    </div>
  );
}
