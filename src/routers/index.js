import express from 'express';
import multer from 'multer'
import routers from '../controllers/auth'
import productRouter from '../controllers/product'
import orderRouter from '../controllers/order'
import {storage,fileFilter} from '../utils/multer'

const router = express.Router();

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter: fileFilter,
  });

router.route('/login').post(routers.login);
router.route('/register').post(routers.register);
router.route('/forgotPassword').post(routers.forgotPassword)
router.route('/resetPassword/:resetToken').put(routers.resetPassword)

router.route('/products').get(productRouter.getAll)
router.route('/product/:id').get(productRouter.getById)
router.route('/product').post(upload.single('image'), productRouter.postProduct)
router.route('/product/:id').delete(productRouter.deleteProduct)

router.route('/order').get(orderRouter.getAll)
router.route('/order/:id').get(orderRouter.getById)
router.route('/order').post(orderRouter.postOrder)

export default router;