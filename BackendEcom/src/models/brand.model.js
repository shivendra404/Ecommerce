import mongoose from "mongoose"

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    brandOwnerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }



}, { timestamp: true })

export const Brand = mongoose.model("Brand", brandSchema)

