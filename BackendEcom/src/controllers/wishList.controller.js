import mongoose, { isValidObjectId } from "mongoose"
import { WishList } from '../models/wishList.model.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'

const createWishListItem = asyncHandler(async (req, res) => {
    const { product, quantity } = req.body;
    const userId = req?.user?._id;

    console.log(product);
    console.log(userId);



    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const isProductId = isValidObjectId(product);

    if (!isProductId) {
        throw new ApiError(400, "Product Id is not valid");
    }


    const alreadyWishList = await WishList.findOne({ product: product, user: userId })
    console.log('alreadyWishList', alreadyWishList);


    if (alreadyWishList && alreadyWishList.quantity < 5) {

        if ((quantity + alreadyWishList.quantity) <= 5) {

            const updatedItem = await WishList.findByIdAndUpdate(
                alreadyWishList._id, // Use the ID of the existing item
                { $inc: { quantity: quantity } }, // Increment the quantity by the specified amount
                { new: true } // Return the updated document
            )
            if (!updatedItem) {
                return res.status(404).json(new ApiResponse(404, {}, "Item not found"));
            }
            return res.status(200).json(new ApiResponse(200, updatedItem, "Quantity Increased Of this item in Wishlist"));
        } else {
            const a = quantity + alreadyWishList.quantity
            const b = qunt - 5
            const quantity = quantity - b
            const updatedItem = await WishList.findByIdAndUpdate(
                alreadyWishList._id, // Use the ID of the existing item
                { $inc: { quantity: quantity } }, // Increment the quantity by the specified amount
                { new: true } // Return the updated document
            )
            if (!updatedItem) {
                return res.status(404).json(new ApiResponse(404, {}, "Item not found"));
            }
            return res.status(200).json(new ApiResponse(200, updatedItem, "Quantity Increased Of this item in Wishlist"));
        }
    }

    if (alreadyWishList && alreadyWishList.quantity == 5) {
        return res.status(200).json(new ApiResponse(200, alreadyWishList, "More Than 5 Quantity can not add of this item"));
    }

    const wishListItem = await WishList.create({
        user: userId,
        product,
        quantity
    })

    if (!wishListItem) {
        return res.status(400).json(new ApiResponse(400, {}, "Item not added to card"));
    }

    return res.status(201).json(new ApiResponse(201, wishListItem, "Item added to WishList"));

})

const countWishListItem = asyncHandler(async (req, res) => {
    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const count = await WishList.countDocuments({ user: userId });

    return res.status(200).json(new ApiResponse(200, { count: count }, "Count retrieved"));
})

const updateWishListItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const isId = isValidObjectId(id);

    if (!isId) {
        throw new ApiError(400, "Id is not valid");
    }

    const item = await WishList.findOneAndUpdate({ _id: id, user: userId }, { quantity }, { new: true });
    // console.log(wi);

    if (!item) {
        return res.status(404).json(new ApiResponse(404, {}, "Item not found"));
    }
    console.log(item);

    return res.status(200).json(new ApiResponse(200, item, "Item updated"));
})

const getAllWishListItems = asyncHandler(async (req, res) => {

    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const items = await WishList.find({ user: userId }).populate('product');

    if (!items) {
        return res.status(400).json(new ApiResponse(400, {}, "Items not found"));
    }

    console.log(items);

    return res.status(200).json(new ApiResponse(200, items, "Items retrieved"));
})

const deleteWishListItem = asyncHandler(async (req, res) => {

    const userId = req?.user?._id;
    const { id } = req.params;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }
    const isId = isValidObjectId(id);

    if (!isId) {
        throw new ApiError(400, "Id is not valid");
    }

    const delteItem = await WishList.findOneAndDelete({ _id: id, user: userId });


    if (!delteItem) {
        return res.status(404).json(new ApiResponse(404, {}, "Item not found"));
    }
    const items = await WishList.find({ user: userId }).populate('product');

    if (!items) {
        return res.status(400).json(new ApiResponse(400, {}, "Items not found"));
    }

    console.log(items);

    return res.status(200).json(new ApiResponse(200, items, "Items retrieved"));
})

export { createWishListItem, updateWishListItem, countWishListItem, getAllWishListItems, deleteWishListItem }
