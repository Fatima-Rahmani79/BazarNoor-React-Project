import { useMemo } from "react";
import { useSelector } from "react-redux";
import Container from "./Container";
import Logo from "./Logo";
import { selectCartCount } from "../features/cart/cartSlice";

export default function Navbar({ onOpenCart }) {
  const count = useSelector(selectCartCount);
  const badge = useMemo(() => (count > 99 ? "99+" : String(count)), [count]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Logo />

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCart}
              className="btn btn-primary gap-2"
              aria-label="Open cart"
            >
              <span>Cart</span>
              <span className="grid h-6 min-w-6 place-items-center rounded-lg bg-white/15 px-2 text-xs font-black">
                {badge}
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
