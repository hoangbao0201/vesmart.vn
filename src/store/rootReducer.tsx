import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cart";

const rootReducer = combineReducers({
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;