import { createSlice } from "@reduxjs/toolkit";
// interface Tuser{
//     email:string,
//     password:string
// }
// interface TState{
//     user:Tuser,
//     token:string
// }

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = null;
            state.token = null
        }
    }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer