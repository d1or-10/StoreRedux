import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice"; // 👈 берем addToCart напрямую из src/store.js

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:border-purple-200 hover:-translate-y-1.5 transition-all duration-300">
      <div>
        <div className="relative h-56 w-full bg-slate-50/70 rounded-xl p-6 mb-5 flex items-center justify-center overflow-hidden">
          {product.category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-slate-600 rounded-lg shadow-sm border border-slate-100">
              {product.category}
            </span>
          )}

          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </div>

        <h2
          title={product.title}
          className="font-bold text-slate-900 text-base leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-purple-600 transition-colors"
        >
          {product.title}
        </h2>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-3.5">
          <span className="text-xl font-extrabold text-slate-900">
            ${Number(product.price).toFixed(2)}
          </span>

          {product.rating?.rate && (
            <span className="flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
              ★ {product.rating.rate}
            </span>
          )}
        </div>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-sm shadow-purple-200 hover:shadow-md hover:shadow-purple-300 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
