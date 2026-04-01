export interface CartSelectedOption {
    optionId: string;
    optionName: string;
    valueSlug: string;
    valueLabel: string;
}

export interface CartItem {
    itemKey: string;
    productId: string;
    productSlug: string;
    productName: string;
    productImage: string | null;
    variantId: string;
    variantPrice: number;
    variantDiscountPercent: number;
    variantStock: number;
    selectedOptions: CartSelectedOption[];
    quantity: number;
    addedAt: string;
    updatedAt: string;
}

export interface CartPricingSummary {
    totalQuantity: number;
    subtotal: number;
}

export interface CartVoucherState {
    code: string;
    discountAmount: number;
}

export interface CartCheckoutState {
    shippingFee: number;
    note: string;
}

export interface CartState {
    items: CartItem[];
    pricing: CartPricingSummary;
    voucher: CartVoucherState | null;
    checkout: CartCheckoutState;
}

export interface AddCartItemPayload {
    item: Omit<CartItem, "quantity" | "addedAt" | "updatedAt">;
    quantity: number;
}
