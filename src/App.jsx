import { useState } from "react";
import { useSelector } from "react-redux";

import Store from "./pages/Store";
import Cart from "./pages/Cart";

function App() {
  const [page, setPage] = useState("store");

  const items = useSelector((state) => state.cart.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
  {/* Фиксированная шапка с полупрозрачным фоном */}
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
    <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-10 h-20">
      
      {/* Логотип */}
      <button
        onClick={() => setPage("store")}
        className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-slate-900 hover:opacity-80 transition-opacity cursor-pointer"
      >
        <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-lg shadow-sm shadow-purple-200">
          S
        </span>
        <span>
          SHOP<span className="text-purple-600">LY</span>
        </span>
      </button>

      {/* Навигационные кнопки */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setPage("store")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            page === "store"
              ? "bg-purple-50 text-purple-700"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Store
        </button>

        <button
          onClick={() => setPage("cart")}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            page === "cart"
              ? "bg-purple-600 text-white shadow-md shadow-purple-200"
              : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
          }`}
        >
          {/* Иконка корзины */}
          <svg
            xmlns="http://w3.org"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span>Cart</span>
          
          {/* Счетчик товаров */}
          {cartCount > 0 && (
            <span
              className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                page === "cart"
                  ? "bg-white text-purple-600"
                  : "bg-purple-500 text-white"
              }`}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  </header>

  {/* Основной контент с ограничением максимальной ширины */}
  <main className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
    {page === "store" ? <Store /> : <Cart />}
  </main>
</div>

  );
}

export default App;