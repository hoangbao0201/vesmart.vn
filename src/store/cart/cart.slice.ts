import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddCartItemPayload, CartItem, CartState } from "./cart.type";

const calculatePricing = (items: CartItem[]) => {
    return items.reduce(
        (acc, item) => {
            acc.totalQuantity += item.quantity;
            acc.subtotal += item.variantPrice * item.quantity;
            return acc;
        },
        {
            totalQuantity: 0,
            subtotal: 0,
        },
    );
};

const initialState: CartState = {
    items: [],
    pricing: {
        totalQuantity: 0,
        subtotal: 0,
    },
    voucher: null,
    checkout: {
        shippingFee: 0,
        note: "",
    },
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<AddCartItemPayload>) => {
            const { item, quantity } = action.payload;
            const safeQuantity = Math.max(1, Math.floor(quantity));
            const now = new Date().toISOString();

            const existingIndex = state.items.findIndex((cartItem) => cartItem.itemKey === item.itemKey);

            if (existingIndex >= 0) {
                const existingItem = state.items[existingIndex];
                const nextQuantity = Math.min(existingItem.quantity + safeQuantity, existingItem.variantStock);
                state.items[existingIndex] = {
                    ...existingItem,
                    ...item,
                    quantity: nextQuantity,
                    updatedAt: now,
                };
            } else {
                const nextQuantity = Math.min(safeQuantity, item.variantStock);
                state.items.push({
                    ...item,
                    quantity: nextQuantity,
                    addedAt: now,
                    updatedAt: now,
                });
            }

            state.pricing = calculatePricing(state.items);
        },
        updateCartItemQuantity: (state, action: PayloadAction<{ itemKey: string; quantity: number }>) => {
            const { itemKey, quantity } = action.payload;
            const item = state.items.find((cartItem) => cartItem.itemKey === itemKey);
            if (!item) return;

            const safeQuantity = Math.max(1, Math.floor(quantity));
            item.quantity = Math.min(safeQuantity, item.variantStock);
            item.updatedAt = new Date().toISOString();
            state.pricing = calculatePricing(state.items);
        },
        removeCartItem: (state, action: PayloadAction<{ itemKey: string }>) => {
            state.items = state.items.filter((item) => item.itemKey !== action.payload.itemKey);
            state.pricing = calculatePricing(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            state.pricing = calculatePricing(state.items);
            state.voucher = null;
        },
    },
});

export const {
    clearCart,
    addItemToCart,
    removeCartItem,
    updateCartItemQuantity,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
