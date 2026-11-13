import React from "react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/getProducts";

function Store() {
  const {
    data: products,
    error,
    isPending,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-slate-500 font-medium animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center my-8">
        {error.message}
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Our Store
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Discover our curated collection of quality products.
          </p>
        </div>

        {products?.length > 0 && (
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 self-start sm:self-auto">
            {products.length} {products.length === 1 ? "product" : "products"} available
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Store;
