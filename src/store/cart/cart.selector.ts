import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
const selectCartState = (state: RootState) => state.cart;

/** Persist / merge cũ có thể thiếu `items` → luôn trả mảng để tránh `.length` / `.map` trên undefined. */
export const selectCartItems = createSelector(
    [selectCartState],
    (cart) => cart?.items ?? [],
);

export const selectCartPricing = createSelector(
    [selectCartState],
    (cart) => ({
        totalQuantity: cart?.pricing?.totalQuantity ?? 0,
        subtotal: cart?.pricing?.subtotal ?? 0,
    }),
);

export const selectCartTotalQuantity = createSelector(
    [selectCartPricing],
    (pricing) => pricing.totalQuantity,
);

export const selectCartSubtotal = createSelector(
    [selectCartPricing],
    (pricing) => pricing.subtotal,
);

export const selectCartVoucher = createSelector(
    [selectCartState],
    (cart) => cart.voucher,
);

export const selectCartCheckout = createSelector(
    [selectCartState],
    (cart) => cart.checkout,
);
