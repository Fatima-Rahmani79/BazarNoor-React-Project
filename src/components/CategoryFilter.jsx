import Chip from "./Chip";

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip active={value === "all"} onClick={() => onChange("all")}>All</Chip>
      {categories.map((c) => (
        <Chip key={c} active={value === c} onClick={() => onChange(c)}>
          {c}
        </Chip>
      ))}
    </div>
  );
}
