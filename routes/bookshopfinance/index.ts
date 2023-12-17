/**
 *        @file category/index.ts
 *     @summary Category routes
 * @description Handles following routes:
 *              - GET  '/v1/BookShopFinance'
 *              - POST '/v1/BookShopFinance'
 *              - PUT '/v1/BookShopFinance/:id'
 *              - DELETE '/v1/BookShopFinance/:id'
 *              - GET '/v1/BookShopFinance/:id'
 */
import express from 'express'

import Schema from '../../middlewares/schema'
import BookShopFinanceValidator from '../../Components/BookShopFinance/Validator/BookShopFinanceValidator'

import { wrapper } from '../../helpers'
import { BookShopFinanceController } from '../../Components/BookShopFinance/Controllers/BookShopFinanceController'

const router = express.Router()


router.post(
  '/',
  (req, res, next) => {
    Schema.handle(req, res, next, BookShopFinanceValidator.createBookShopFinance())
  },
  wrapper(BookShopFinanceController.create),
)

router.get(
  '/',
  wrapper(BookShopFinanceController.index),
)


router.get(
  '/:id',
  wrapper(BookShopFinanceController.show),
)

router.delete(
  '/:id',

  wrapper(BookShopFinanceController.destroy),
)

router.put(
  '/:id',
  (req, res, next) => {
    Schema.handle(req, res, next, BookShopFinanceValidator.editBookShopFinance())
  },
  wrapper(BookShopFinanceController.update),
)

export default router
