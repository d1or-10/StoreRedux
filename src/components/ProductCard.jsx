
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain"
      />

      <h2 className="font-bold mt-4">
        {product.title}
      </h2>

      <p className="text-purple-600 font-bold mt-2">
        ${product.price}
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="bg-purple-600 text-white w-full py-3 rounded-xl mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
