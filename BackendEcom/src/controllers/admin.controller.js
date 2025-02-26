import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';



const generateAccessAndRefreshTokens = async (userId) => {

    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        // console.log(accessToken, "accessToken");
        const refreshToken = user.generateRefreshToken()
        // console.log(refreshToken, "refreshToken");

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong")

    }
}


const registerAdmin = asyncHandler(async (req, res) => {

    const { userName, email, fullName, phoneNumber, password, code } = req.body;




    if (
        [userName, email, fullName, phoneNumber, password, code].some((field) =>
            field.trim() === "")
    ) {

        throw new ApiError(400, "All fields are required")
    }
    console.log(typeof code);

    if (code !== 'PASSWORDCODE') {
        throw new ApiError(400, "Admin code is not valid")
    }

    const role = "admin";
    const exitedUser = await User.findOne({ $or: [{ userName }, { email }] })

    if (exitedUser) {
        throw new ApiError(409, "user with email and username is already exist")
    }
    // console.log(req.file);
    // console.log(req.file.avatar);
    // console.log(req.file?.avatar[0]);

    // const avatarLocalPath = req.file?.path
    // if (!avatarLocalPath) {
    //     throw new ApiError(400, "avatar file is required")
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)

    // if (!avatar) {
    //     throw new ApiError(400, "avatar file is required")
    // }
    // avatar: { url: avatar.secure_url, public_id: avatar.public_id },

    const user = await User.create({
        fullName,
        email,
        password,
        phoneNumber,
        role,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password")


    if (!createdUser) {
        throw new ApiError(500, "Something went wrong")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user Registered successfully")
    )

})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    if (!email && !username) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new ApiError(400, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "password not correct")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);


    const loggenInUser = await User.findById(user._id).select("-password -refreshToken",)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                loggenInUser,
                "user logged ")
        )
})


const logoutAdmin = asyncHandler(async (req, res) => {
    const userId = req.user._id

    await User.findByIdAndUpdate(req.user._id,
        {
            $unset:
            {
                refreshToken: 1
            }
        },
        {
            new: true
        })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out"))
})

const getCurrentAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(404, "user not found")
    }
    return res.status(200).json(new ApiResponse(200, user, "user found"))
})
export { registerAdmin, loginAdmin, logoutAdmin, getCurrentAdmin }