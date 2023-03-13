import listReducer from "./slice/listReducer";
import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./slice/authSlice"

const store = configureStore({
    reducer: {
        productList: listReducer,
        session :sessionSlice,
    },
})

export default store;