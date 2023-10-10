import { createSlice } from "@reduxjs/toolkit";

interface VariantDetailProps {
    name: string,
    value: string
}

export interface CartSlideState {
    id: string
    skuId: string
    skuP: string
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
            const idA = action.payload.split("|");
            const productsFilter = state.products.filter(product => !(idA[1] !== "" ? product.id === idA[0] && product.skuP == idA[1] : product.id === idA[0]));
            state.products = productsFilter;
        },
    },
});

export const { addCartHandle, setCartHandle, removeCartHandle } = counterSlice.actions;

export default counterSlice.reducer;
