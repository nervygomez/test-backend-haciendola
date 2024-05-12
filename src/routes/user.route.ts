import { Router } from 'express';
import { check  } from 'express-validator';

import { createUser, getUserById } from '../controllers/user.controller';
import { validateFields } from '../middleware/validator-fields.middleware';
import { verifyToken } from '../middleware/validator-token.middleware';
import { userDuplicated } from '../utils/db-validator.utls';

const router = Router();

router.get('/:id', [verifyToken], getUserById);
router.post('/', [
    check('name').not().isEmpty().withMessage('name is required'),
    check('email').not().isEmpty().withMessage('email is required'),
    check('lastName').not().isEmpty().withMessage('lastName is required'),
    check('password').not().isEmpty().withMessage('password is required'),
    check('userName').not().isEmpty().withMessage('userName is required'),
    check('userName').custom(userDuplicated),
    validateFields
],  createUser);

export default router;