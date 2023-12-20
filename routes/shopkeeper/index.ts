/**
 *        @file ShopKeeper/index.ts
 *     @summary ShopKeeper routes
 * @description Handles following routes:
 *              - POST 'ShopKeeper/login'

 */
import express from 'express'
import Schema from '../../middlewares/schema'
import ShopKeeperValidator from '../../Components/ShopKeeper/Validator/ShopKeeperValidator'
import { wrapper } from '../../helpers'
import { ShopKeeperController } from '../../Components/ShopKeeper/Controllers/ShopKeeperContoller'


const router = express.Router()

router.post(
  '/login',
  (req, res, next) => {
    Schema.handle(req, res, next, ShopKeeperValidator.login())
  },
  wrapper(ShopKeeperController.login),
)



router.post(
  '/create',
  (req, res, next) => {
    Schema.handle(req, res, next, ShopKeeperValidator.create())
  },
  wrapper(ShopKeeperController.create),
)

router.get(
  '/',
  wrapper(ShopKeeperController.index),
)


router.put(
  '/:id',
  wrapper(ShopKeeperController.update),
)

router.get("/access", wrapper(ShopKeeperController.checkShopkeeper));

router.get(
  '/:id',
  wrapper(ShopKeeperController.veiwShopKeeper),
)

router.delete(
  '/:id',
  wrapper(ShopKeeperController.destroy),
)
export default router
