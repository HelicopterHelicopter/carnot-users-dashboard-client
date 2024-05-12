import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:false,
    error:false
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = false
        },
        signInFailure:(state,action)=> {
            state.loading = false,
            state.error = action.payload
        },
        signOut:(state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser = {...state.currentUser,...action.payload}
        },
        profilePicUpdateSuccess:(state,action)=>{
            state.currentUser = {...state.currentUser,profilePic:action.payload}
        }
    }
});

export const {signInStart,signInFailure,signInSuccess,signOut,updateUserSuccess,profilePicUpdateSuccess} = userSlice.actions;

export default userSlice.reducer;