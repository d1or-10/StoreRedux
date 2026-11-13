import { useSelector, useDispatch } from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-5 rounded-xl mb-4 shadow"
            >
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p>${item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    dispatch(decreaseQuantity(item.id))
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(increaseQuantity(item.id))
                  }
                >
                  +
                </button>

                <button
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                  className="text-red-500 ml-3"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="text-2xl font-bold mt-8">
            Total: ${totalPrice.toFixed(2)}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;