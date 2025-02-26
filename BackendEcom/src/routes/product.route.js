import { Router } from "express"
import { registerProduct, updateProduct, updateProductImage, getAllProduct, getProduct } from "../controllers/product.controller.js"
import { upload } from '../middleware/multer.middleware.js'
import { verifyJWT } from '../middleware/authn.middleware.js'
import { authorizeRoles } from "../middleware/authz.middleware.js"
const router = Router()



// router.post('/registerProduct', verifyJWT, authorizeRoles(["admin"]),upload.single("productImage"), (req, res) => {
//     res.send("i am shivendra kumar")
// });

router.route("/registerProduct").post(verifyJWT, authorizeRoles(["admin"]), upload.single("productImage"), registerProduct)
router.route("/updateProduct").patch(verifyJWT, authorizeRoles(["admin"]), updateProduct)
router.route("/updateProductImage").patch(verifyJWT, authorizeRoles(["admin"]), upload.single("productImage"), updateProductImage)
router.route("/getAllProduct").get(getAllProduct)
router.route("/getProduct/:id").get(getProduct)


export default router;