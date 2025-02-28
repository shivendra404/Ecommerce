import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticate: false,
    isLoading: false,
    productItems: null,
};



export const searchedProduct = createAsyncThunk(
    "product/searchedProduct",
    async (searchQuery) => {
        const response = await axios.get(
            `http://localhost:9000/api/v1/product/getSearchedProduct/${searchQuery}`
        );
        console.log('response,response', response);

        return response?.data;
    }
);




export const getProduct = createAsyncThunk(
    "product/getProduct",
    async () => {
        console.log("all done");
        
        const response = await axios.get(
            'http://localhost:9000/api/v1/product/getAllProduct'
        );
        console.log('response,response get', response);

        return response?.data;
    }
);







const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {

    },
    extraReducers: ((builder) => {
        builder.
            addCase(getProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productItems = action.payload.data;
            })
            .addCase(getProduct.rejected, (state) => {
                state.isLoading = false;
                state.productItems = [];
            })
            .addCase(searchedProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchedProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productItems = action.payload.data;
            })
            .addCase(searchedProduct.rejected, (state) => {
                state.isLoading = false;
                state.productItems = [];
            })
    })
})




export const { } = productSlice.actions;

export default productSlice.reducer;

