export default function TagPills({ tags = [], size = "sm" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li
          key={t}
          className={`rounded-full border border-accent/60 font-semibold uppercase tracking-wider text-accent ${
            size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
          }`}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
