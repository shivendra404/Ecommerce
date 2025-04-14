import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createNewOrder = createAsyncThunk("/order/createOrder",

    async (orderData) => {
        const response = await axios.post(
            'http://localhost:9000/api/v1/order/create',
            orderData,
            {
                withCredentials: true
            }
        );
        // console.log("response", response);

        return response.data;
    }
)


export const captureOrder = createAsyncThunk("/order/captureOrder",
    async ({ paymentId, payerId, orderId }) => {
        // console.log("paymentId", paymentId);
        // console.log("payerId", payerId);
        console.log("jii444444444444444444444");


        const response = await axios.post(
            'http://localhost:9000/api/v1/order/capture',
            { paymentId, payerId, orderId },
            {
                withCredentials: true
            }
        );


        return response.data;
    }
)

const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null
}

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {

    },
    extraReducers: ((builder) => {
        builder.
            addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload.approvalURL;
                state.orderId = action.payload.orderId;
                sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId))
            })
            .addCase(createNewOrder.rejected, (state) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = [];

            })
        // .addCase(getOrderCount.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(getOrderCount.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.orderCount = action?.payload?.data?.count
        // })
        // .addCase(getOrderCount.rejected, (state) => {
        //     state.isLoading = false;
        //     state.orderCount = null
        // })
        // .addCase(fetchOrderItems.pending, (state) => {
        // state.isLoading = true;
        // })
        // .addCase(fetchOrderItems.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.OrderItems = action.payload.data;
        // })
        // .addCase(fetchOrderItems.rejected, (state) => {
        //     state.isLoading = false;
        //     state.OrderItems = []
        // })
    })
})




export const { } = orderSlice.actions;

export default orderSlice.reducer;

