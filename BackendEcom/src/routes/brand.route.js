import { Router } from "express"
import { registerBrand, updateBrand, deleteBrand, getAllBrand } from "../controllers/brand.controller.js"
import { verifyJWT } from "../middleware/authn.middleware.js"
import { authorizeRoles } from "../middleware/authz.middleware.js"
const router = Router()



router.route("/registerBrand").post(verifyJWT, authorizeRoles(["admin"]), registerBrand)
router.route("/:brandId").patch(verifyJWT, authorizeRoles(["admin"]), updateBrand)
    .delete(verifyJWT, authorizeRoles(["admin"]), deleteBrand)

router.route("/allBrand").get(verifyJWT, authorizeRoles(["admin"]), getAllBrand)
export default router;  