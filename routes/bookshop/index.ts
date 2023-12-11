/**
 *        @file category/index.ts
 *     @summary Category routes
 * @description Handles following routes:
 *              - GET  '/v1/BookShop'
 *              - POST '/v1/BookShop'
 *              - PUT '/v1/BookShop/:id'
 *              - DELETE '/v1/BookShop/:id'
 *              - GET '/v1/BookShop/:id'
 */
import express from 'express'

import Schema from '../../middlewares/schema'
import BookShopValidator from '../../Components/BookShop/Validator/BookShopValidator'

import { wrapper } from '../../helpers'
import { BookShopController } from '../../Components/BookShop/Controllers/BookShopController'

const router = express.Router()


router.post(
  '/',
  (req, res, next) => {
    Schema.handle(req, res, next, BookShopValidator.createBookShop())
  },
  wrapper(BookShopController.create),
)

router.get(
  '/',
  wrapper(BookShopController.index),
)


router.get(
  '/:id',
  wrapper(BookShopController.show),
)

router.delete(
  '/:id',

  wrapper(BookShopController.destroy),
)

router.put(
  '/:id',
  (req, res, next) => {
    Schema.handle(req, res, next, BookShopValidator.editBookShop())
  },
  wrapper(BookShopController.update),
)

export default router
