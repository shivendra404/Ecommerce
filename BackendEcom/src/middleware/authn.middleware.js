import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { refreshAccessToken } from '../controllers/user.controller.js'



export const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken
        // || req.header("Authorization")?.replace("Bearer ", "")
        console.log(token);

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
        // console.log(error?.name == "TokenExpiredError");

        if (error?.name == "TokenExpiredError") {
            // console.log("hiiiii");
            refreshAccessToken(req, res, next)

        }
        else {

            throw new ApiError(401, error?.message || "Invalid access token")
        }
    }

})