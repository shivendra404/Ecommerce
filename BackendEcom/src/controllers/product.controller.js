import { isValidObjectId } from "mongoose"
import { Product } from '../models/product.model.js'
import { User } from '../models/user.model.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const registerProduct = asyncHandler(async (req, res) => {

    const { productName, description, price, stock, categoryId, brandId } = req.body

    console.log(productName, description, price, stock, categoryId, brandId);

    if ([productName, description, price, stock, categoryId, brandId].some(field => field.trim() === "")) {
        throw new ApiError(400, "all field required")
    }
    const isCategoryId = isValidObjectId(categoryId)
    const isBrandId = isValidObjectId(brandId)

    if (!isCategoryId && !isBrandId) {
        throw new ApiError(400, "categoryId or brandId are invalid")
    }

    const exitedProduct = await User.findOne({ productName: productName })

    if (exitedProduct) {
        throw new ApiError(409, `product with ${productName} is already exist`)
    }

    const productLocalPath = req.file?.path
    // console.log(req.file?.path);

    if (!productLocalPath) {
        throw new ApiError(400, "productImage file is required")
    }

    const productImage = await uploadOnCloudinary(productLocalPath)
    // console.log(productImage, "productImage");



    if (!productImage) {
        throw new ApiError(400, "productimage file is required")
    }

    const product = await Product.create({
        productName,
        description,
        prodImage: { url: productImage.secure_url, public_id: productImage.public_id },
        price,
        stock,
        categoryId,
        brandId
    })

    const createdProduct = await Product.findById(product._id)

    if (!createdProduct) {
        throw new ApiError(500, "Something went wrong")
    }

    console.log(createdProduct);

    return res.status(201).json(
        new ApiResponse(201, createdProduct, "Product created Successfully")
    )

})


const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const updateData = req.body

    const isProduct = isValidObjectId(productId)

    if (isProduct) {
        throw new ApiError(400, "ProductId is required")
    }

    if (Object.Keys(updateData).length === 0) {
        throw new ApiError(400, "No product data is found")
    }

    const product = await Product.findById(productId)


    if (!Product) {
        throw new ApiError(404, "No product found")
    }

    const updatedProduct = await Product.findByIdAndUpdate({ _id: product._id }, { $set: updateData }, { new: true })

    return res.status(200).json(
        new ApiResponse(200, updatedProduct, "Product data update successfully")
    )
})

const updateProductImage = asyncHandler(async () => {
    const { productId } = req.params

    const isProduct = isValidObjectId(productId)

    if (isProduct) {
        throw new ApiError(400, "ProductId is required")
    }

    const oldProduct = await Product.findOne(productId)

    if (!oldProduct) {
        throw new ApiError(404, "No product found")
    }

    const productImagePublicId = oldProduct.prodImage.public_id  //for deleting old image

    const productImgLocalPath = req.file?.path

    if (!productImgLocalPath) {
        throw new ApiError(400, "Product file is missing")
    }

    const productImage = await uploadOnCloudinary(productImgLocalPath)

    const product = await Produnct.findByIdAndUpdate(
        { _id: oldProduct._id },
        {
            $set: {
                prodImage: { url: productImage.secure_url, public_id: productImage.public_id },
            }
        },
        { new: true })

    if (avatarPublicId && product.productImage.public_id) {
        // await deleteFromCloudinary(productImagePublicId)
        const oldProductImg = await deleteFromCloudinary(productImagePublicId)
        console.log(oldProductImg);
    }


    return res.status(200).json(
        new ApiResponse(200, product, "product image update successefully")
    )


})


const getAllProduct = asyncHandler(async (req, res) => {

    const products = await Product.find()
        .populate('categoryId', 'name')
        .populate('brandId', 'brandName')
        .select('productName description price prodImage.url categoryId brandId');

    console.log(products);

    const transformedProducts = products.map(product => ({
        _id: product._id,
        productName: product.productName,
        price: product.price,
        description: product.description,
        prodImage: product.prodImage.url,
        category: product.categoryId ? product.categoryId.name : null,
        brand: product.brandId ? product.brandId.brandName : null
    }));

    console.log(transformedProducts)


    if (!transformedProducts || transformedProducts.length === 0) {
        throw new ApiError(404, "No products found")
    }

    res.status(200).json(

        new ApiResponse(200, transformedProducts, "Product fetched successfully")
    )
})

const getProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;


    const isId = isValidObjectId(id)

    if (!isId) {
        throw new ApiError(400, "Id is not valid")
    }

    const product = await Product.findById({ _id: id }).populate('categoryId', 'name')
        .populate('brandId', 'brandName')
        .select('productName description price prodImage.url categoryId brandId');

    if (!product) {
        throw new ApiError(500, "something wend wrong")
    }

    return res.status(200).json(
        new ApiResponse(200, product, "product data fetched")
    )

})


const getSearchProduct = asyncHandler(async (req, res) => {

    const { searchQuery } = req.params

    if (searchQuery && typeof searchQuery !== "string") {
        return res.status(400).json(
            new ApiResponse(400, {}, "Keyword is required and must be in string format")
        )
    }

    const pipeline = [];


    console.log("hii");

    if (searchQuery) {
        pipeline.push(
            {
                $match: {
                    $text: { $search: searchQuery } // Replaces `$search` with `$text`
                }
            },
            {
                $addFields: {
                    score: { $meta: "textScore" } // Use `textScore` for sorting results
                }
            },
            {
                $sort: {
                    score: -1
                }
            }
        );
    }

    // If no search query, return all documents
    if (pipeline.length === 0) {
        pipeline.push({ $match: {} });
    }

    console.log("hii2");

    const searchResults = await Product.aggregate(pipeline);

    console.log(searchResults);


    return res
        .status(200)
        .json(new ApiResponse(200, searchResults, "product fetched successfully"));


})

export { registerProduct, updateProduct, updateProductImage, getAllProduct, getProduct, getSearchProduct }