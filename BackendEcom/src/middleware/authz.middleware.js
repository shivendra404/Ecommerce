import { ApiResponse } from '../utils/ApiResponse.js';



export const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {

        // console.log("come here");

        try {
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json(new ApiResponse(403, {}, "User is not Autherize")); // Forbidden
            }
        } catch (error) {
            console.log("Autherization Error", error);
        }

        // console.log("all done from here");

        next();
    };
};