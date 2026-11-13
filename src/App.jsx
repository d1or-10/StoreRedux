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
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-purple-600">
          SHOPLY
        </h1>

        <div className="flex gap-6">
          <button onClick={() => setPage("store")}>
            Store
          </button>

          <button onClick={() => setPage("cart")}>
            Cart ({cartCount})
          </button>
        </div>
      </nav>

      {page === "store" ? <Store /> : <Cart />}
    </div>
  );
}

export default App;