import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer, { CartSlideState } from "./cartSlice";
import orderReducer, { OrderSlideState } from "./orderSlice";


export interface RootState {
    cart: CartSlideState,
    order: OrderSlideState
}

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    // blacklist: ['comment', 'banners']
};

const rootReducer = combineReducers({ cart: cartReducer, order: orderReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);