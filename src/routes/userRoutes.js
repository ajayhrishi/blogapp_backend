// Import express using CommonJS syntax
import express from 'express';
const router = express.Router();
//,deleteUser,editUser
import {getAllUser,signUp,login} from '../controllers/userController.js'

router.get('/', getAllUser);
router.post('/signUp', signUp);
router.post('/login',login);
export default router;