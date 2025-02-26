import { Category } from "../models/category.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { isValidObjectId } from "mongoose"


const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (name.trim() === "") {
        return res.json(ApiError(400, "Name of category is required"))
    }

    const category = await Category.create({
        name,
        description: description || ""
    })

    if (!category) {
        throw new ApiError(500, "SomeThing wend wrong")
    }

    return res.status(201).json(
        new ApiResponse(201, category, "Category created successfully")
    )

})


const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find()
    // console.log(categories);

    res.status(200).json(
        new ApiResponse(200, categories, "All category fetched successfully")
    )
})



const getCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const isCategoryId = isValidObjectId(categoryId)


    if (isCategoryId) {
        throw new ApiError(400, "CategoryId is required")
    }

    const category = await Category.findById(categoryId)
    res.status(200).json(
        new ApiResponse(200, category, "Category fetched successfully")
    )
})


const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const updateCategoryData = req.body
    const isCategoryId = isValidObjectId(categoryId)

    if (isCategoryId) {
        throw new ApiError(400, "Invalid CategoryId")
    }

    const category = await Category.findByIdAndUpdate(categoryId, { $set: updateCategoryData }, { new: true })

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    res.status(200).json(
        new ApiResponse(200, category, "Category update successfully")
    )
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const isCategoryId = isValidObjectId(categoryId)

    if (isCategoryId) {
        throw new ApiError(400, "Invalid CategoryId")
    }

    const category = await Category.findByIdAndDelete(categoryId)

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    res.status(200).json(
        new ApiResponse(200, category, "Category deleted successfully")
    )
})



export { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory }
