export default function SidebarSection({ title, children }) {
  return (
    <div className="font-light text-lg px-2 mb-12">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
