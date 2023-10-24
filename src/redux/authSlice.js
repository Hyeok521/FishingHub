import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.auth = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.auth = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state) => {
            state.auth = null;
        })
    }
})

export const fetchUser = createAsyncThunk("auth/userInfo", async (token) => {
    const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/member/info", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    console.log(response.data)
    return response.data
})

export default authSlice;
export const {setUserInfo} = authSlice.actions;