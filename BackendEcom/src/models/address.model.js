import mongoose, { Schema } from "mongoose"


const addressSchema = new Schema(

    {
        street: {
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
        zipCode: {
            type: String,
            required: true
        }
    },

    { timestapms: true }
)



export const Address = mongoose.model("Address", addressSchema)



