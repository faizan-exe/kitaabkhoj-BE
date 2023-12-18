/**
 *        @file category/index.ts
 *     @summary Category routes
 * @description Handles following routes:
 *              - GET  '/v1/Order'
 *              - POST '/v1/Order'
 *              - PUT '/v1/Order/:id'
 *              - DELETE '/v1/Order/:id'
 *              - GET '/v1/Order/:id'
 */
import express from 'express'

import Schema from '../../middlewares/schema'
import OrderValidator from '../../Components/Order/Validator/OrderValidator'

import { wrapper } from '../../helpers'
import { OrderController } from '../../Components/Order/Controllers/OrderController'

const router = express.Router()


router.post(
  '/',
  (req, res, next) => {
    Schema.handle(req, res, next, OrderValidator.createOrder())
  },
  wrapper(OrderController.create),
)

router.get(
  '/',
  wrapper(OrderController.index),
)


router.get(
  '/:id',
  wrapper(OrderController.show),
)

router.delete(
  '/:id',

  wrapper(OrderController.destroy),
)

router.put(
  '/:id',
  (req, res, next) => {
    Schema.handle(req, res, next, OrderValidator.editOrder())
  },
  wrapper(OrderController.update),
)

export default router
