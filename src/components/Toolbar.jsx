import CategoryFilter from "./CategoryFilter";
import SortSelect from "./SortSelect";

export default function Toolbar({
  categories,
  category,
  onCategory,
  query,
  onQuery,
  sort,
  onSort,
}) {
  return (
    <div className="card p-4 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="text-sm font-extrabold text-slate-900">Browse products</div>
          <div className="mt-1 text-xs font-semibold text-slate-600">
            Filter by category, search by name, and sort by price or rating.
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <input
            className="input md:w-[260px]"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search products..."
          />
          <SortSelect value={sort} onChange={onSort} />
        </div>
      </div>

      <div className="mt-4 border-t border-slate-200 pt-4">
        <CategoryFilter categories={categories} value={category} onChange={onCategory} />
      </div>
    </div>
  );
}
