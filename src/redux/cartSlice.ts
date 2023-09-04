import { createSlice } from "@reduxjs/toolkit";

interface VariantDetailProps {
    name: string,
    value: string
}

export interface CartSlideState {
    id: string
    image: string
    name: string
    price: number
    count: number
    stock: number
    variant: [] | VariantDetailProps[]
}

const initialState : {
    products: CartSlideState[]
} = {
    products: []
};

export const counterSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartHandle: (state, action) => {
            state.products.unshift(action.payload)
        },
        setCartHandle: (state, action) => {
            state.products = action.payload
        },
        removeCartHandle: (state, action) => {
            state.products = action.payload
        },
    },
});

export const { addCartHandle, setCartHandle, removeCartHandle } = counterSlice.actions;

export default counterSlice.reducer;
