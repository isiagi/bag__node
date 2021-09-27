import express from 'express';
import routers from '../controllers/auth'

const router = express.Router();

router.route('/login').post(routers.login);
router.route('/register').post(routers.register);

export default router;