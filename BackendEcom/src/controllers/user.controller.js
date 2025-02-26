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



const registerUser = asyncHandler(async (req, res) => {

    const { userName, email, fullName, phoneNumber, password } = req.body;
    // console.log(userName);
    // console.log(email);
    // console.log(fullName);
    // console.log(phoneNumber);
    // console.log(password);
    if (
        [userName, email, fullName, phoneNumber, password].some((field) =>
            field.trim() == "")
    ) {

        return res.json(ApiError(400, "All fields are required"))
    }


    const exitedUser = await User.findOne({ $or: [{ userName }, { email }] })

    if (exitedUser) {
        throw new ApiError(409, "user with email and username is already exist")
    }
    // console.log(req.file);
    // console.log(req.file.avatar);
    // console.log(req.file?.avatar[0]);
    // console.log(req.file?.path);

    // const avatarLocalPath = req.file?.path
    // if (!avatarLocalPath) {
    //     throw new ApiError(400, "avatar file is required")
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)

    // if (!avatar) {
    //     throw new ApiError(400, "avatar file is required")
    // }

    const user = await User.create({
        fullName,
        // avatar: { url: avatar.secure_url, public_id: avatar.public_id },
        email,
        password,
        phoneNumber,
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

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    if (!email && !username) {
        throw new ApiError(400, "username or email is required")
    }
    // console.log(password);


    const user = await User.findOne({ email })
    // console.log(user);


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


const logoutUser = asyncHandler(async (req, res) => {
    // const userId = req.user._id

    await User.findByIdAndUpdate(req.user._id,
        {
            $unset:
            {
                refreshToken: 1  // use this
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

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    // const incomingRefreshTokent = req.cookies.accessToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
    try {

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFERESH_TOKEN_SECRET)
        // console.log(decodedToken);
        // const decodedTokent = jwt.verify(incomingRefreshTokent, process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodedTokent);

        const user = await User.findById(decodedToken?._id).select('refreshToken')
        // console.log(user);



        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        // console.log(incomingRefreshToken !== user?.refreshToken, "tokenssssssss");
        // console.log(incomingRefreshToken);
        // console.log(user?.refreshToken);

        // res.json(
        //     new ApiResponse(200, user, 'all fine')
        // )


        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        // console.log(user, "hello");

        const { newRefreshToken, newAccessToken } = await generateAccessAndRefreshTokens(user._id)
        // console.log(newAccessToken, "hello2");

        return res.status(200)
            .cookie("accessToken", newAccessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken
                    },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refreshed token")
    }
})


const getCurrentUser = asyncHandler(async (req, res) => {

    // const user = await User.findById(req.user._id)

    return res.status(200).json(
        new ApiResponse(
            200, req.user, "current user fetched successfully"
        )
    )
})



export { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser }