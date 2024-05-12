import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middleware/validator-fields.middleware";
import { verifyToken } from "../middleware/validator-token.middleware";
import {
    registerProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    importByExcel
    
} from "../controllers/product.controller";

const router = Router();

router.post('/', [
    verifyToken,
    check('handle').not().isEmpty().withMessage('handle is required'),
    check('title').not().isEmpty().withMessage('title is required'),
    check('sku').not().isEmpty().withMessage('sku is required'),
    check('grams').not().isEmpty().withMessage('grams is required'),
    check('stock').not().isEmpty().withMessage('stock is required'),
    check('price').not().isEmpty().withMessage('price is required'),
    validateFields
], registerProduct);

router.get('/', [verifyToken], getAllProduct);

router.post('/bulk', importByExcel);

router.get('/:id', [
    verifyToken,
    check('id').not().isEmpty().withMessage('handle is required'),
    validateFields
], getProductById);

router.put('/:id', [verifyToken], updateProduct);
router.delete('/:id', [verifyToken], deleteProduct);



export default router;