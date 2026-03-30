import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decQty,
  incQty,
  removeFromCart,
  selectCartTotal,
} from "../features/cart/cartSlice";

export default function CartDrawer({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);

  const itemCount = items.reduce((sum, it) => sum + it.qty, 0);

  return (
    <div className={["fixed inset-0 z-50", open ? "" : "pointer-events-none"].join(" ")}>
      <div
        onClick={onClose}
        className={[
          "absolute inset-0 bg-black/40 transition",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      <aside
        className={[
          "absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-hidden={!open}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <div className="text-sm font-extrabold text-slate-900">Bazaar-e-Noor Cart</div>
            <div className="text-xs font-semibold text-slate-500">
              {items.length} item types • {itemCount} total items
            </div>
          </div>

          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>

        {/* Body */}
        <div className="h-[calc(100%-220px)] overflow-auto p-5">
          {items.length === 0 ? (
            <div className="grid place-items-center py-14 text-center">
              <div className="text-base font-extrabold text-slate-900">Your basket is empty</div>
              <div className="mt-2 text-sm font-medium text-slate-600">
                Add products from Bazaar-e-Noor to see them here.
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="card p-4">
                  <div className="flex gap-3">
                    <div className="grid h-16 w-16 place-items-center rounded-xl bg-slate-50">
                      <img
                        src={it.image}
                        alt={it.title}
                        className="h-12 w-12 object-contain mix-blend-multiply"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-extrabold text-slate-900 line-clamp-2">
                          {it.title}
                        </div>

                        <button
                          className="btn btn-ghost px-3 py-1.5 text-xs"
                          onClick={() => dispatch(removeFromCart(it.id))}
                          aria-label={`Remove ${it.title} from cart`}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-1 flex items-center justify-between">
                        <div className="text-sm font-extrabold text-slate-900">
                          ${(it.price * it.qty).toFixed(2)}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className="btn btn-ghost px-3 py-1.5"
                            onClick={() => dispatch(decQty(it.id))}
                            aria-label={`Decrease quantity of ${it.title}`}
                          >
                            −
                          </button>

                          <span className="min-w-8 text-center text-sm font-extrabold text-slate-900">
                            {it.qty}
                          </span>

                          <button
                            className="btn btn-ghost px-3 py-1.5"
                            onClick={() => dispatch(incQty(it.id))}
                            aria-label={`Increase quantity of ${it.title}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="mt-1 text-xs font-semibold text-slate-500">
                        Unit: ${it.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-slate-600">Total</div>
            <div className="text-lg font-black text-slate-900">${total.toFixed(2)}</div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              className="btn btn-ghost flex-1"
              onClick={() => dispatch(clearCart())}
              disabled={items.length === 0}
            >
              Clear basket
            </button>

            <button
              className="btn btn-primary flex-1"
              disabled={items.length === 0}
              onClick={() => alert("Checkout is coming soon for Bazaar-e-Noor.")}
            >
              Continue to checkout
            </button>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-500">
            Bazaar-e-Noor demo: add a checkout flow + persist cart with localStorage.
          </p>
        </div>
      </aside>
    </div>
  );
}