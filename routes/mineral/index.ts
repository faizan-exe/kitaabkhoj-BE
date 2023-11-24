/**
 *        @file category/index.ts
 *     @summary Category routes
 * @description Handles following routes:
 *              - GET  '/setup/category'
 *              - POST '/setup/category'
 *              - PUT '/setup/category/:id'
 *              - DELETE '/setup/category/:id'
 *              - GET '/setup/category/:id'
 */
import express from 'express'

// import Schema from '../../middlewares/schema'
// import PromoValidator from '../../Components/Mineral/Validator/MineralValidator'

import { wrapper } from '../../helpers'
import { MineralController } from '../../Components/Mineral/Controllers/MineralController'

const router = express.Router()


router.get(
  '/',
  wrapper(MineralController.index),
)
export default router
