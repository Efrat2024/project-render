import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "../Slices/apiSlice"
import authSliceReducer from "../Slices/authSlice"
import counter from "../Slices/counterSlice"
const store = configureStore({
    reducer: {
        counter,
        auth: authSliceReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
export default store
