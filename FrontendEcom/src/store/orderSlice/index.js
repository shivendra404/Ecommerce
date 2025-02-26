import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    orderCount: null,
    OrderItems: []
};


export const addToOrder = createAsyncThunk(
    "order/addToOrder",

    async ({ productId, productPrice, productQuantity, description }) => {
        const response = await axios.post(
            'http://localhost:9000/api/v1/order',
            {
                productId, productPrice, productQuantity, description
            },
            {
                withCredentials: true
            }
        );
        // console.log("response", response);

        return response.data;
    }
);


export const fetchOrderItems = createAsyncThunk(
    "order/fetchAllOrder",
    async () => {
        const response = await axios.get(
            'http://localhost:9000/api/v1/order', {
            withCredentials: true
        }
        );

        return response.data;
    }
);

// export const deleteCartItem = createAsyncThunk(
//     "cart/deleteCartItem",
//     async ({ userId, productId }) => {
//         const response = await axios.delete(
//             'http://localhost:9000/api/v1/wishList/addWishListItem'
//         );

//         return response.data;
//     }
// );

// export const updateCartQuantity = createAsyncThunk(
//     "cart/updateCartQuantity",
//     async ({ userId, productId, quantity }) => {
//         const response = await axios.put(
//             'http://localhost:9000/api/v1/wishList/addWishListItem',
//             {
//                 userId,
//                 productId,
//                 quantity,
//             }
//         );

//         return response.data;
//     }
// );


export const getOrderCount = createAsyncThunk(
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




const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {

    },
    extraReducers: ((builder) => {
        builder.
            addCase(addToOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.OrderItems = action.payload.data;
            })
            .addCase(addToOrder.rejected, (state) => {
                state.isLoading = false;
                state.OrderItems = [];
            })
            .addCase(getOrderCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderCount = action?.payload?.data?.count
            })
            .addCase(getOrderCount.rejected, (state) => {
                state.isLoading = false;
                state.orderCount = null
            })
            .addCase(fetchOrderItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrderItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.OrderItems = action.payload.data;
            })
            .addCase(fetchOrderItems.rejected, (state) => {
                state.isLoading = false;
                state.OrderItems = []
            })
    })
})




export const { } = orderSlice.actions;

export default orderSlice.reducer;

