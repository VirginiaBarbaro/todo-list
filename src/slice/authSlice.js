import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: "session",
    initialState: {token: null, user: null},
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            console.log(action.payload)
        },
        setUser(state, action) {
            state.user = action.payload
            console.log(action.payload)
        }
    }
})

export const {setToken, setUser} = sessionSlice.actions
export default sessionSlice.reducer