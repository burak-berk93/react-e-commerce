import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false
  }

  export const appSlice = createSlice({
    name:"app",
    initialState,
    reducers: {

    },
    extraReducers:(builder)=>{

    }
  })

  // Action creators are generated for each case reducer function
export const {} = appSlice.actions;

export default appSlice.reducer;