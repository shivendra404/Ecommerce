import { isValidObjectId } from "mongoose"
import { Brand } from '../models/brand.model.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'



const registerBrand = asyncHandler(async (req, res) => {
    const { brandName, brandOwnerName, email, phoneNumber, city, state, description } = req.body

    // console.log(brandName, brandOwnerName, email, phoneNumber, city, state, description);

    if (
        [brandName, brandOwnerName, email, phoneNumber, description].some(field => field.trim() === "")
    ) {
        throw new ApiError(400, "all field are required")
    }

    const exitedBrand = await Brand.findOne({ brandName: brandName });
    // console.log(exitedBrand);


    if (exitedBrand) {
        throw new ApiError(400, "This brand is already exits")
    }

    const brand = await Brand.create({ brandName, brandOwnerName, email, phoneNumber, city, state, description })

    return res.status(200).json(
        new ApiResponse(200, brand, "Brand added successfully")
    )

})

const updateBrand = asyncHandler(async (req, res) => {
    try {
        const { brandId } = req.params
        const updateData = req.body

        const isBrand = isValidObjectId(brandId)

        if (!isBrand) {
            throw new ApiError(400, "Brand Id id required")
        }

        if (Object.keys(updateData).length === 0) {
            throw new ApiError(400, "No data provided for update")
        }

        const brand = await Brand.findById({ _id: brandId })

        if (!brand) {
            throw new ApiError(404, "No brand found")
        }

        const updatedBrand = await Brand.findByIdAndUpdate({ _id: brand._id }, { $set: updateData }, { new: true })

        return res.status(200).json(
            new ApiResponse(200, updatedBrand, "Brand data update successfully")
        )
    } catch (error) {
        console.log("Error update brand", error);
        throw new ApiError(500, "server side Error")
    }

})



const deleteBrand = asyncHandler(async (req, res) => {

    try {
        const { brandId } = req.params;

        const isBrand = isValidObjectId(brandId)

        if (!isBrand) {
            throw new ApiError(400, "Brand id id required")
        }

        const brand = await Brand.findById({ _id: brandId })

        if (!brand) {
            throw new ApiError(404, "Brand Not found")
        }

        const deletedBrand = await Brand.findByIdAndDelete({ _id: brandId })

        return res.status(200).json(200, deletedBrand, "Brand Deleted successfully")

    } catch (error) {

        console.log("Error delete brand", error);

    }
})

const getAllBrand = asyncHandler(async (req, res) => {
    try {

        const brands = await Brand.find()
        // console.log(brands);

        if (!brands) {
            throw new ApiError(500, "something wend wrong")
        }
        return res.status(200).json(
            new ApiResponse(200, brands, "Brands Successfully fetched")
        )
    } catch (error) {
        console.log("Error fetch all Brand", error)
        return res.status(500).json({
            error: "Internal server error",
            message: "An error occurred while fetching users."
        });
    }

})

// const toggleActive = asyncHandler(async()=>{})

export { registerBrand, updateBrand, deleteBrand, getAllBrand }