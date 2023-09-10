import { createSlice } from "@reduxjs/toolkit";

export interface OrderSlideState {
    id: string
    name: string
    phone: string
    code: string
    adress: string
    description: string
    productsOrder: string

    createdAt: Date
    updatedAt: Date
}

const initialState : {
    orders: OrderSlideState[]
} = {
    orders: []
};

export const counterSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrderHandle: (state, action) => {
            state.orders.unshift(action.payload)
        },
        setOrderHandle: (state, action) => {
            state.orders = action.payload
        },
        removeOrderHandle: (state, action) => {
            const id = action.payload;
            const ordersFilter = state.orders.filter(order => order.id !== id);
            state.orders = ordersFilter;
        },
    },
});

export const { addOrderHandle, setOrderHandle, removeOrderHandle } = counterSlice.actions;

export default counterSlice.reducer;
