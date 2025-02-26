import { Router } from "express"
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js"
import { verifyJWT } from '../middleware/authn.middleware.js'
import { authorizeRoles } from "../middleware/authz.middleware.js"

const router = Router()

router.route("/createCategory").post(verifyJWT, authorizeRoles(["admin"]), createCategory)
router.route("/allCategories").get(verifyJWT, authorizeRoles(["admin"]), getAllCategories)
router.route("/:categoryId").get(verifyJWT, authorizeRoles(["admin"]), getCategory)
    .patch(verifyJWT, authorizeRoles(["admin"]), updateCategory)
    .delete(verifyJWT, authorizeRoles(["admin"]), deleteCategory)
    .get(verifyJWT, authorizeRoles(["admin"]), getCategory)


// router.route("/")

export default router