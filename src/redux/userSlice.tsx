import { createSlice } from "@reduxjs/toolkit";

export interface UserSlideState {
    id: string
    fullName: string
    email: string
    username: string
    level: number
    avatarUrl: string
}
export interface AdressSlideState {
    fullName: string
    phone: string
    city: OptionAdress | null
    district: OptionAdress | null
    ward: OptionAdress | null
    specificAdress: string
}

type OptionAdress = {
    value: string
    label: string
}

const initialState : {
    currentUser: UserSlideState | null
    userLoading: boolean
    isAuthenticated: boolean
    adressUser: AdressSlideState
} = {
    currentUser: null,
    userLoading: false,
    isAuthenticated: false,
    adressUser: {
        fullName: "",
        phone: "",
        city: null,
        district: null,
        ward: null,
        specificAdress: "", 
    }
};

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAdressHandle: (state, action) => {
            state.adressUser = {
                ...state.adressUser,
                ...action.payload
            };
        },
    },
});

export const { setAdressHandle } = counterSlice.actions;

export default counterSlice.reducer;
