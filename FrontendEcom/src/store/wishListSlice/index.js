import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    wishListCount: 0,
    isLoading: false,
    wishListItems: [],
};

export const addWishlist = createAsyncThunk("wishList/addTOWishList",
    async ({ product, quantity }) => {
        // console.log(product, quantity);
        // console.log("hii2");

        const response = await axios.post('http://localhost:9000/api/v1/wishList/addWishListItem',
            {
                product: product,
                quantity: quantity,
            },
            {
                withCredentials: true
            });

        // console.log("thunk addwishlist response", response);

        return response.data
    }
)

export const fetchWishItems = createAsyncThunk(
    "wishList/fetchWishList",
    async () => {
        const response = await axios.get(
            "http://localhost:9000/api/v1/wishList/getAllWishListItem",
            {
                withCredentials: true
            }
        );
console.log(response);

        return response.data;
    }
);

export const getWishListCount = createAsyncThunk(
    "wishList/getWishListCount",
    async () => {
        const response = await axios.get(
            "http://localhost:9000/api/v1/wishList/countWishListItem", {
            withCredentials: true
        }
        );
        // console.log(response);

        return response.data;

    }
);


export const deleteWishItem = createAsyncThunk(
    "wishList/deleteWishList",
    async ({ wishListId }) => {
        console.log(wishListId);

        const response = await axios.delete(
            `http://localhost:9000/api/v1/wishList/deleteWishListItem/${wishListId}`,
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
const wishListSlice = createSlice({
    name: "wishList",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteWishItem.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(deleteWishItem.fulfilled, (state, action) => {
                console.log("state from addcase", state);

                if (state) {
                    console.log("state.data", state.data);

                }
                console.log("action from addcase", action);
                state.isLoading = false;
                state.wishListItems = action.payload.data;
            })
            .addCase(deleteWishItem.rejected, (state) => {
                state.isLoading = false;
                // state.wishListItems = []
            }).
            addCase(addWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishListItems = action.payload.data;
            })
            .addCase(addWishlist.rejected, (state) => {
                state.isLoading = false;
                state.wishListItems = [];
            })
            .addCase(getWishListCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWishListCount.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload);
                state.wishListCount = action.payload.data.count
            })
            .addCase(getWishListCount.rejected, (state) => {
                state.isLoading = false;
                state.wishListCount = null
            })
            .addCase(fetchWishItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWishItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishListItems = action.payload.data;
            })
            .addCase(fetchWishItems.rejected, (state) => {
                state.isLoading = false;
                state.wishListItems = []
            })

    }
})


export const { } = wishListSlice.actions;

export default wishListSlice.reducer;
