// Import express using CommonJS syntax
import express from 'express';
const router = express.Router();

import {getAllUser,signUp,login,deleteUser,editUser} from '../controllers/userController.js';

router.get('/', getAllUser);
router.post('/signUp', signUp);
router.post('/login',login);
export default router;