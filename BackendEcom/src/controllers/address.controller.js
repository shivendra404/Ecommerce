const Address = require("../../models/Address");
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const newlyCreatedAddress = new Address({
            userId,
            address,
            city,
            pincode,
            notes,
            phone,
        });

        await newlyCreatedAddress.save();

        res.status(201).json({
            success: true,
            data: newlyCreatedAddress,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};



const addAddresses = asyncHandler(async (req, res) => {

    const { userId, address, city, pincode, phone, notes } = req.body;
    const isUser = isValidObjectId(userId)

    if (isUser) {
        res.status().json()
    }

    if (
        [userId, address, city, pincode, phone, notes].some((field) =>
            field.trim() === "")
    ) {

        return res.status(400).json(
            ApiResponse(400, { message: "Invalid data provided!" },)
        )
    }

})
























const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required!",
            });
        }

        const addressList = await Address.find({ userId });

        res.status(200).json({
            success: true,
            data: addressList,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

const editAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and address id is required!",
            });
        }

        const address = await Address.findOneAndUpdate(
            {
                _id: addressId,
                userId,
            },
            formData,
            { new: true }
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        res.status(200).json({
            success: true,
            data: address,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and address id is required!",
            });
        }

        const address = await Address.findOneAndDelete({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
