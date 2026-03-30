import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/products/productsSlice";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.products.status);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main className="py-8">
        <Container>
          <div className="mb-6">
            <div className="text-2xl font-black text-slate-900">
              Bazaar-e-Noor ✨
            </div>
            <div className="mt-2 max-w-2xl text-sm font-medium text-slate-600">
              A modern Afghan-inspired marketplace experience, built with React, Redux Toolkit, and
              Tailwind CSS. Browse products with fast search, filters, sorting, and a smooth cart
              drawer.
            </div>
          </div>

          <ProductList />
        </Container>
      </main>

      <footer className="border-t border-slate-200 py-8">
        <Container>
          <div className="text-xs font-semibold text-slate-500">
            Bazaar-e-Noor • React + Redux Toolkit + Tailwind
          </div>
        </Container>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}