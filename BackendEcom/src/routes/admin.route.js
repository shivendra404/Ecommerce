import { Router } from "express"
import { registerAdmin, loginAdmin, logoutAdmin, getCurrentAdmin } from "../controllers/admin.controller.js"
import { upload } from '../middleware/multer.middleware.js'
import { verifyJWT } from '../middleware/authn.middleware.js'
import { authorizeRoles } from "../middleware/authz.middleware.js"


const router = Router()

router.route("/register").post(upload.single("avatar"), registerAdmin)
router.route("/login").post(loginAdmin)

router.route("/logout").post(verifyJWT, authorizeRoles(["admin"]), logoutAdmin)
router.route("/getCurrentAdmin").get(verifyJWT, authorizeRoles(["admin"]), getCurrentAdmin)


export default router
