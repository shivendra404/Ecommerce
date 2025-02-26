import { Router } from "express"
import { createOrder, getAllOrders, getOrderById, cancellOrder } from "../controllers/order.controller.js"
import { verifyJWT } from '../middleware/authn.middleware.js'
import { authorizeRoles } from "../middleware/authz.middleware.js"

const router = Router()
router.route('/').post(verifyJWT, authorizeRoles(['user']), createOrder)
    .get(verifyJWT, authorizeRoles(['user', 'admin']), getAllOrders);
router.get('/:id', verifyJWT, authorizeRoles(['user', 'admin']), getOrderById);
router.delete('/:id/:productId', verifyJWT, authorizeRoles(['user', 'admin']), cancellOrder);

export default router;
