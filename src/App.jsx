import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Store from "./pages/Store";
import Cart from "./pages/Cart";

function App() {
  const [page, setPage] = useState("store");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const items = useSelector((state) => state.cart.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-10 h-20">
          
          {/* Логотип */}
          <button
            onClick={() => setPage("store")}
            className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-lg shadow-sm shadow-purple-200 dark:shadow-none">
              S
            </span>
            <span>
              SHOP<span className="text-purple-600 dark:text-purple-400">LY</span>
            </span>
          </button>

          {/* Навигационные кнопки */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Кнопка переключения Light / Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {darkMode ? (
                <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setPage("store")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                page === "store"
                  ? "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Store
            </button>

            <button
              onClick={() => setPage("cart")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                page === "cart"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                  : "bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 shadow-sm"
              }`}
            >
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

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
        {page === "store" ? <Store /> : <Cart />}
      </main>
    </div>
  );
}

export default App;
