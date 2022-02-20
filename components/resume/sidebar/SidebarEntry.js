import ThemedIcon from "../../ThemedIcon";

export default function SidebarEntry({ IconComponent, children }) {
  return (
    <div className="flex items-center my-3">
      <ThemedIcon component={IconComponent} className="w-6 mr-4" />
      {children}
    </div>
  );
}
