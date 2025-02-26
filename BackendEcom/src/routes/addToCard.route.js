import { Router } from 'express';
import { verifyJWT } from '../middleware/authn.middleware.js';
import { authorizeRoles } from "../middleware/authz.middleware.js";

import {
    createAddToCard,
    countAddToCard,
    getAllAddToCard,
    updateAddToCard,
    deleteAddToCard
} from '../controllers/addToCard.controller.js';

const router = Router();

router.use(verifyJWT);
router.use(authorizeRoles(['admin', 'user']));

router.route('/').post(createAddToCard)

router.route('/itemCount').get(countAddToCard);
router.route('/allCartItem').get(getAllAddToCard);
router.route('/:id').patch(updateAddToCard).delete(deleteAddToCard);

export default router;