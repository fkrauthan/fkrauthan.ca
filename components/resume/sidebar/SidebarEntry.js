export default function SidebarEntry({ IconComponent, children }) {
  return (
    <div className="flex items-center my-3">
      <IconComponent className="w-6 mr-4" />
      {children}
    </div>
  );
}
