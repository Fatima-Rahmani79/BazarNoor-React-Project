export default function SortSelect({ value, onChange }) {
  return (
    <select className="input max-w-[220px]" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="featured">Featured</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
      <option value="rating-desc">Rating: High → Low</option>
    </select>
  );
}
