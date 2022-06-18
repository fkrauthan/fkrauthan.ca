export function SkillListItem({ title }) {
  return (
    <>
      <span className="rounded-xl bg-gray-300 dark:bg-gray-800 px-3 whitespace-nowrap mx-0.5 text-xs py-1">
        {title}
      </span>{" "}
    </>
  );
}

export default function SkillList({ title, children }) {
  return (
    <li>
      <div>{title}</div>
      <p>{children}</p>
    </li>
  );
}
