import { Router } from "express"
import { createWishListItem, updateWishListItem, countWishListItem, getAllWishListItems, deleteWishListItem } from "../controllers/wishList.controller.js"
import { verifyJWT } from '../middleware/authn.middleware.js'
import { authorizeRoles } from "../middleware/authz.middleware.js"

const router = Router()

router.route("/addWishListItem").post(verifyJWT, authorizeRoles(["user"]), createWishListItem)
router.route("/updateWishListItem/:id").patch(verifyJWT, authorizeRoles(["user"]), updateWishListItem)
router.route("/countWishListItem").get(verifyJWT, authorizeRoles(["user"]), countWishListItem)
router.route("/getAllWishListItem").get(verifyJWT, authorizeRoles(["user"]), getAllWishListItems)
router.route("/deleteWishListItem/:id").delete(verifyJWT, authorizeRoles(["user"]), deleteWishListItem)
export default router