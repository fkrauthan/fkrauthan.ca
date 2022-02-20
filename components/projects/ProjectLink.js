import ThemedIcon from "../ThemedIcon";

function ProjectLink({ href, title, icon }) {
  return (
    <a
      href={href}
      style={{ textDecoration: "none", width: "34px", height: "34px" }}
      className="inline-block border p border-yellow-500 rounded-full border-opacity-0 hover:border-opacity-100"
      title={title}
      target="_blank"
      rel="noopener noreferrer">
      <ThemedIcon component={icon} width="32px" height="32px" />
    </a>
  );
}

export default ProjectLink;
