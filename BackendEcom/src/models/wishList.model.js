import mongoose from "mongoose"



const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }, quantity: {
        type: Number,
        default: 1
    }

}, {
    timestamps: true
});

export const WishList = mongoose.model('WishList', wishListSchema);

