import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    addToCartCount: 0,
    isLoading: true,
    addToCart: [],
};


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity }) => {
        console.log("hii2");

        const response = await axios.post(
            'http://localhost:9000/api/v1/addToCart',
            {
                product: productId,
                quantity,
            },
            {
                withCredentials: true
            }
        );

        return response.data;
    }
);

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async () => {
        const response = await axios.get(
            'http://localhost:9000/api/v1/addtocart/allCartItem', {
            withCredentials: true
        }
        );
        console.log(response);

        return response.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    "wishList/deleteWishList",
    async ({ id }) => {
        console.log(id);

        const response = await axios.delete(
            `http://localhost:9000/api/v1/addToCart//${id}`,
            {
                withCredentials: true
            }
        );

        console.log("rsponse from thunk wishlist delte", response);
        console.log();


        // return {}
        return response.data;
    }
);

export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(
            'http://localhost:9000/api/v1/wishList/addWishListItem',
            {
                userId,
                productId,
                quantity,
            }
        );

        return response.data;
    }
);


export const getAddToCartCount = createAsyncThunk(
    "addToCard/getAddToCartCount",
    async () => {
        const response = await axios.get(
            "http://localhost:9000/api/v1/addToCart/itemCount", {
            withCredentials: true
        }
        );
        // console.log(response);

        return response.data;
    }
);




const addToCartSlice = createSlice({
    name: "addToCart",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: ((builder) => {
        builder.
            addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false; // console.log("from addtocart slice ", action.payload);
                state.addToCart = action.payload.data;
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false;
                state.addToCart = [];
            })
            .addCase(getAddToCartCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAddToCartCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addToCartCount = action?.payload?.data?.count
            })
            .addCase(getAddToCartCount.rejected, (state) => {
                state.isLoading = false;
                state.addToCartCount = null
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addToCart = action.payload.data;
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.isLoading = false;
                state.addToCart = []
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addToCart = action.payload.data;
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.isLoading = false;
                state.addToCart = []
            })
    })
})


export const { } = addToCartSlice.actions;

export default addToCartSlice.reducer;
