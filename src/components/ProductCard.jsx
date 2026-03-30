import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function clamp(text, n = 90) {
  if (!text) return "";
  return text.length > n ? text.slice(0, n).trim() + "…" : text;
}

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="card overflow-hidden">
      <div className="flex items-center justify-center bg-slate-50 p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-44 w-44 object-contain mix-blend-multiply"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-extrabold text-slate-900">{clamp(product.title, 60)}</h3>
          <span className="badge">${product.price.toFixed(2)}</span>
        </div>

        <p className="mt-2 text-xs font-medium text-slate-600">
          {clamp(product.description, 110)}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-500">
            <span className="capitalize">{product.category}</span>
            <span className="mx-2">•</span>
            <span>⭐ {product.rating?.rate ?? 0}</span>
          </div>

          <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
