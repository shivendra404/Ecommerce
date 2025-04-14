// import mongoose from 'mongoose';
// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     productPrice: {
//         type: Number,
//         required: true
//     },
//     isProductDelivered: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
//     productQuantity: {
//         type: Number,
//         required: true,
//         default: 1
//     },
//     orderDate: {
//         type: Date,
//         default: Date.now
//     },
//     description: {
//         type: String,
//         trim: true
//     }
// });

// export const Order = mongoose.model('Order', orderSchema);


import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
  
    cartItems: [
        {
            ProductId: String,
            title: String,
            image: String,
            price: String,
            quantity: Number
        },
    ],
    addressInfo: {

        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
    isProductDelivered: {
        type: Boolean,
        required: true,
        default: false
    },


}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema);


