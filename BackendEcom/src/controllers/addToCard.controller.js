import mongoose, { isValidObjectId } from "mongoose"
import { AddToCard } from '../models/addToCard.model.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'
import { Product } from "../models/product.model.js";

// Create a new item in the card
const createAddToCard = asyncHandler(async (req, res) => {
    const { product, quantity } = req.body;
    const userId = req?.user?._id;

    // console.log("product", product);
    // console.log("quantity", quantity);

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const isProductId = isValidObjectId(product);


    if (!isProductId) {
        throw new ApiError(400, "Product  id not valid")
    }
    // console.log(product);

    // const alreadyAddTocard = await AddToCard.findOne({ product: mongoose.Types.ObjectId(product) })
    const alreadyAddTocard = await AddToCard.findOne({ product: product, user: userId })
    // console.log('alreadyAddTocard', alreadyAddTocard);


    if (alreadyAddTocard && alreadyAddTocard.quantity < 5) {

        if ((quantity + alreadyAddTocard.quantity) <= 5) {

            const updatedItem = await AddToCard.findByIdAndUpdate(
                alreadyAddTocard._id,
                { $inc: { quantity: quantity } },
                { new: true }
            )
            if (!updatedItem) {
                return res.status(404).json(new ApiResponse(404, {}, "Item not found"));
            }
            return res.status(200).json(new ApiResponse(200, updatedItem, "Quantity Increase of this item"));
        } else {
            const a = quantity + alreadyAddTocard.quantity
            const b = qunt - 5
            const quantity = quantity - b
            const updatedItem = await AddToCard.findByIdAndUpdate(
                alreadyAddTocard._id,
                { $inc: { quantity: quantity } },
                { new: true }
            )
            if (!updatedItem) {
                return res.status(404).json(new ApiResponse(404, {}, "Item not found"));
            }
            return res.status(200).json(new ApiResponse(200, updatedItem, "Quantity Increase of this item"));
        }
    }

    if (alreadyAddTocard && alreadyAddTocard.quantity == 5) {
        return res.status(200).json(new ApiResponse(200, alreadyAddTocard, "More Than 5 Quantity can not add of this item"));
    }
    const newItem = await AddToCard.create({
        user: userId,
        product,
        quantity
    })


    if (!newItem) {
        return res.status(400).json(new ApiResponse(400, {}, "Item not added to card"));
    }

    return res.status(201).json(new ApiResponse(201, newItem, "Item added to card"));
});


const countAddToCard = asyncHandler(async (req, res) => {
    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const count = await AddToCard.countDocuments({ user: userId });

    return res.status(200).json(new ApiResponse(200, { count: count }, "Count retrieved"));
});


const getAllAddToCard = asyncHandler(async (req, res) => {

    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const items = await AddToCard.find({ user: userId }).populate('product');

    if (!items) {
        return res.status(404).json(new ApiResponse(404, {}, "Item not found"));
    }

    return res.status(200).json(new ApiResponse(200, items, "Item retrieved"));

});

// Update an item in the card
const updateAddToCard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const isId = isValidObjectId(id);
    if (!isId) {
        throw new ApiError(400, "Invalid id");
    }
    const updatedItem = await AddToCard.findByIdAndUpdate(id, { quantity }, { new: true });

    if (!updatedItem) {
        return res.status(404).json(new ApiResponse(404, {}, "Item not found"));
    }

    return res.status(200).json(new ApiResponse(200, updatedItem, "Item updated"));
});

// Delete an item from the card
const deleteAddToCard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id
    const isId = isValidObjectId(id);
    if (!isId) {
        throw new ApiError(400, "Invalid id");
    }
    const deletedItem = await AddToCard.findByIdAndDelete(id);

    if (!deletedItem) {
        return res.status(404).json(new ApiResponse(404, {}, "Item not found"));
    }


    const items = await AddToCard.find({ user: userId }).populate('product');

    if (!items) {
        return res.status(400).json(new ApiResponse(400, {}, "Items not found"));
    }

    console.log(items);

    return res.status(200).json(new ApiResponse(200, items, "Items retrieved"));
});

export {
    createAddToCard,
    countAddToCard,
    getAllAddToCard,
    updateAddToCard,
    deleteAddToCard
};