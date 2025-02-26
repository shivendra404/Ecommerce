import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticate: false,
    isLoading: false,
    user: null,
};

export const registerUser = createAsyncThunk("auth/register", async (formData) => {
    const response = await axios.post("http://localhost:9000/api/v1/user/register", formData, {
        withCredentials: true,
    });
    return response.data;
});

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
    const response = await axios.post("http://localhost:9000/api/v1/user/login", formData, {
        withCredentials: true,
    });

    // console.log(response, "from authslice");

    return response.data;
});


export const checkAuth = createAsyncThunk("auth/checkauth", async () => {
    const response = await axios.get("http://localhost:9000/api/v1/user/currentUser", {
        withCredentials: true,
    });
    // console.log(response, "from authslice checkauth");

    return response.data;
});


export const logoutUser = createAsyncThunk(
    "/auth/logout",

    async () => {
        const response = await axios.post(
            "http://localhost:9000/api/v1/user/logout",
            {},
            {
                withCredentials: true,
            }
        );
        console.log(response);


        return response.data;
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false;
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false;
        }).addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action?.payload?.success ? action.payload : null
            state.isAuthenticate = action?.payload?.success
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false;
        }).addCase(checkAuth.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action?.payload?.success ? action.payload : null
            state.isAuthenticate = action?.payload?.success
        }).addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false;
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false;
        })
    }

})


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
