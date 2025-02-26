
import { Order } from "../models/order.model.js"
import { Product } from "../models/product.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { isValidObjectId } from "mongoose"


const createOrder = asyncHandler(async (req, res) => {

    const { productId, productPrice, productQuantity, description } = req.body;
    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const isProductId = isValidObjectId(productId);

    if (!isProductId) {
        throw new ApiError(400, "Product Id is required");
    }

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(400).json(new ApiResponse(400, {}, "Product not found"));
    }

    if (product.quantity < productQuantity) {
        return res.status(400).json(new ApiResponse(400, {}, "Product quantity not available"));
    }

    const newOrder = await Order.create({
        user: userId,
        product: productId,
        productPrice,
        productQuantity,
        description
    })

    const productQnt = newOrder.productQuantity;

    const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, { quantity: product.quantity - productQnt }, { new: true });

    if (!updatedProduct) {
        return res.status(400).json(new ApiResponse(400, {}, "Product quantity not updated"));
    }


    if (!newOrder) {
        return res.status(400).json(new ApiResponse(400, {}, "Order not created"));
    }

    return res.status(201).json(new ApiResponse(201, newOrder, "Order created"));
})

const getAllOrders = asyncHandler(async (req, res) => {

    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const orders = await Order.find({ user: userId }).populate('product');

    if (!orders) {
        return res.status(400).json(new ApiResponse(400, {}, "No orders found"));
    }

    return res.status(200).json(new ApiResponse(200, orders, "Orders retrieved"));
})

const getOrderById = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const isId = isValidObjectId(id);

    if (!isId) {
        throw new ApiError(400, "Id is not valid");
    }

    const order = await Order.findOne({ _id: id, user: userId }).populate('product');

    if (!order) {
        return res.status(400).json(new ApiResponse(400, {}, "No order found"));
    }

    return res.status(200).json(new ApiResponse(200, order, "Order retrieved"));
})

const updateOrder = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { productQuantity, description } = req.body;
    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const isId = isValidObjectId(id);

    if (!isId) {
        throw new ApiError(400, "Id is not valid");
    }

    const order = await Order.findOneAndUpdate({ _id: id, user: userId }, { productQuantity, description }, { new: true });

    if (!order) {
        return res.status(400).json(new ApiResponse(400, {}, "Order not updated"));
    }

    return res.status(200).json(new ApiResponse(200, order, "Order updated"));
})

const cancellOrder = asyncHandler(async (req, res) => {

    const { id, productId } = req.params;
    const userId = req?.user?._id;

    if (!userId) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const isId = isValidObjectId(id);
    const isProductId = isValidObjectId(productId);

    if (!isId && !isProductId) {
        throw new ApiError(400, "Order Id or product id  are not valid");
    }

    const order = await Order.findOne({ _id: id, user: userId });

    const productQnt = order.productQuantity;

const product = await Product.findByIdAndUpdate(productId, { $inc: { quantity: productQnt } }, { new: true });

if (!product) {
    return res.status(400).json(new ApiResponse(400, {}, "Product quantity not updated"));
}


    const orderDeleted = await Order.findOneAndDelete({ _id: id, user: userId });

    if (!orderDeleted) {
        return res.status(400).json(new ApiResponse(400, {}, "Order not deleted"));
    }

    return res.status(200).json(new ApiResponse(200, orderDeleted, "Order deleted"));
})

export { createOrder, getAllOrders, getOrderById, updateOrder, cancellOrder }        