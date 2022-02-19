import clsx from "clsx";

export default function ActivePill({ active = false }) {
  return (
    <span
      className={clsx(
        "text-xs rounded-xl border py-0.5 px-2",
        active && "border-green-600 text-green-600",
        !active && "border-gray-500 text-gray-500"
      )}>
      {active ? "active" : "past"}
    </span>
  );
}
