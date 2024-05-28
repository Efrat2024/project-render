
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        id:"",
        token: localStorage.getItem("token") || "",
        role: localStorage.getItem("role") || "",
        isUserLoggedIn: localStorage.getItem("token") ? true : false
    },
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.accessToken
            const role=action.payload.status==1?"Manager":"User"
            state.token = token
            state.role=role
            state.isUserLoggedIn = true
            localStorage.setItem("", null)
            localStorage.setItem("token", token)
            localStorage.setItem("role", role)
        },
        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            localStorage.removeItem("token")
         

        },
        removeRole: (state) => {
             state.role=""
             localStorage.removeItem("role")
         

        },
        Logout:(state,action)=>{
                                      state.token=null}
    }
})
export default authSlice.reducer
export const { setToken, removeToken,removeRole } = authSlice.actions

