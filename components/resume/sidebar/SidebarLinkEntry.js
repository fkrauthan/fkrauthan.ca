import SidebarEntry from "./SidebarEntry";

export default function SidebarLinkEntry({ IconComponent, title, href }) {
  return (
    <SidebarEntry IconComponent={IconComponent}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
        {title}
      </a>
    </SidebarEntry>
  );
}
