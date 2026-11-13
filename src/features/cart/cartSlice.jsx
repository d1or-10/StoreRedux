import  { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items : JSON.parse(localStorage.getItem("cart"))|| [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;

            const existingProduct = state.items.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({
                    ...product,
                    quantity: 1,
                });
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        increaseQuantity: (state, action) => {
            const product = state.items.find(
                (item) => item.id === action.payload
            );

            if (product) {
                product.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const product = state.items.find(
                (item) => item.id === action.payload
            );

            if (!product) return;

            if (product.quantity > 1) {
                product.quantity -= 1;
            } else {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload
                );
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;