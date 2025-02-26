import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    isProductDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    productQuantity: {
        type: Number,
        required: true,
        default: 1
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true
    }
});

export const Order = mongoose.model('Order', orderSchema);

 