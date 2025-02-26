import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"



export const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        // console.log(token);


        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log(decodedToken);

        if (!user) {
            throw new ApiError(401, "invalid access token")
        }

        req.user = user;
        // console.log("this is from authorize", user);

        next();
    } catch (error) {
        console.log('error', error);

        if (error?.name == "TokenExpiredError") {
            return res.status(401).json({
                status: "error",
                code: 'TOKEN_EXPIRED',
                message: error.message,
                expiredAt: error.expiredAt,  
                solution: '/api/auth/refresh',
            })
        }
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})