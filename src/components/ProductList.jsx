import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setQuery, setSort } from "../features/products/productsSlice";
import Loader from "./Loader";
import EmptyState from "./EmptyState";
import Toolbar from "./Toolbar";
import ProductGrid from "./ProductGrid";

function normalize(s) {
  return String(s || "").toLowerCase().trim();
}

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error, category, query, sort } = useSelector((s) => s.products);

  const categories = useMemo(() => {
    const set = new Set(items.map((p) => p.category));
    return Array.from(set).sort();
  }, [items]);

  const visible = useMemo(() => {
    const q = normalize(query);

    let out = items;

    if (category !== "all") out = out.filter((p) => p.category === category);
    if (q) out = out.filter((p) => normalize(p.title).includes(q));

    switch (sort) {
      case "price-asc":
        out = [...out].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out = [...out].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        out = [...out].sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
        break;
      default:
        break;
    }

    return out;
  }, [items, category, query, sort]);

  if (status === "loading") return <Loader label="Fetching products..." />;

  if (status === "failed") {
    return (
      <div className="card p-6">
        <div className="text-base font-extrabold text-slate-900">Couldn’t load products</div>
        <div className="mt-2 text-sm font-medium text-slate-600">{error}</div>
        <button className="btn-primary mt-4" onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Toolbar
        categories={categories}
        category={category}
        onCategory={(c) => dispatch(setCategory(c))}
        query={query}
        onQuery={(q) => dispatch(setQuery(q))}
        sort={sort}
        onSort={(s) => dispatch(setSort(s))}
      />

      {visible.length === 0 ? (
        <EmptyState
          title="No products found"
          subtitle="Try changing the category or clearing the search."
        />
      ) : (
        <ProductGrid products={visible} />
      )}
    </div>
  );
}
