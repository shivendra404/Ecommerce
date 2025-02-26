import { Router } from "express"
import { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser } from "../controllers/user.controller.js"
import { upload } from '../middleware/multer.middleware.js'
import { verifyJWT } from '../middleware/authn.middleware.js'
import { authorizeRoles } from "../middleware/authz.middleware.js"

const router = Router()
router.route("/register").post(registerUser)
// router.route("/register").post(upload.single("avatar"), registerUser
// )
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refreshToken").post(refreshAccessToken)

router.route("/currentUser").get(verifyJWT, getCurrentUser)

export default router