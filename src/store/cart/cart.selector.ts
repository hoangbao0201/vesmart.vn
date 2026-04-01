import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
    [selectCartState],
    (cart) => cart.items,
);

export const selectCartPricing = createSelector(
    [selectCartState],
    (cart) => cart.pricing,
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
