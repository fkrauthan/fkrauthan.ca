export function SkillListItem({ title }) {
  return (
    <>
      <span className="rounded-xl bg-gray-300 px-3 whitespace-nowrap mx-0.5">{title}</span>{" "}
    </>
  );
}

export default function SkillList({ title, children }) {
  return (
    <li>
      <div>{title}</div>
      <p className="leading-8">{children}</p>
    </li>
  );
}
