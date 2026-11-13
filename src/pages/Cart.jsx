import { useSelector, useDispatch } from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import { useState } from "react";
import CheckoutModal from "../components/CheckoutModal";

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isModalOpen , setIsModalOpen] = useState(false)

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="py-4">
  <div className="flex items-baseline justify-between mb-8">
    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
      Shopping Cart
    </h1>
    {items.length > 0 && (
      <span className="text-sm font-medium text-slate-500">
        {items.reduce((acc, item) => acc + item.quantity, 0)} items
      </span>
    )}
  </div>

  {items.length === 0 ? (
    /* Оформление пустой корзины */
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
      <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://w3.org"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Your cart is empty
      </h2>
      <p className="text-slate-500 max-w-sm">
        Looks like you haven&apos;t added anything to your cart yet. Explore the store to find something you love.
      </p>
    </div>
  ) : (
    /* Двухколоночная сетка для заполненной корзины */
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* Левая колонка: список товаров */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Информация о товаре */}
            <div className="flex items-center gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded-xl bg-slate-50 p-2 border border-slate-100 shrink-0"
                />
              )}
              <div>
                <h2 className="font-bold text-slate-900 text-lg leading-snug">
                  {item.title}
                </h2>
                <p className="text-purple-600 font-semibold mt-1">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Управление количеством и удаление */}
            <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              {/* Степпер (- / 1 / +) */}
              <div className="flex items-center bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm font-bold transition-all cursor-pointer"
                >
                  −
                </button>

                <span className="w-10 text-center font-semibold text-slate-900 text-sm">
                  {item.quantity}
                </span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  aria-label="Increase quantity"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm font-bold transition-all cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Кнопка удаления с иконкой */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                title="Remove item"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span className="sm:hidden">Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Правая колонка: карточка с итогом (Order Summary) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm lg:sticky lg:top-28">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Order Summary
        </h2>

        <div className="space-y-3 text-sm border-b border-slate-100 pb-4 mb-4">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span className="font-medium text-slate-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span className="font-medium text-emerald-600">Free</span>
          </div>
        </div>

        <div className="flex justify-between items-baseline mb-6">
          <span className="text-base font-bold text-slate-900">Total</span>
          <span className="text-2xl font-extrabold text-slate-900">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-semibold rounded-xl shadow-md shadow-purple-200 transition-all cursor-pointer"
          onClick={()=> setIsModalOpen(true)}
        >
          Proceed to Checkout
        </button>
      </div>

    </div>
  )}
  <CheckoutModal
    isOpen={isModalOpen}
    onClose={()=> setIsModalOpen(false)}
    totalPrice={totalPrice}
   />
</div>

  );
}

export default Cart;