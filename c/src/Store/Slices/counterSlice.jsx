import {createSlice} from '@reduxjs/toolkit'

const initVal = {
    cnt:0
}

const counter = createSlice({
name:"count",
initialState:initVal,
reducers:{
add:(state,actions)=>{
    state.cnt+=actions.payload.add
},
addMany:(state,actions)=>{
    state.cnt+=actions.payload.add
}
}
})
export const {add,addMany}  = counter.actions
export default counter.reducer