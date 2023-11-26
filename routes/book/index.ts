/**
 *        @file category/index.ts
 *     @summary Category routes
 * @description Handles following routes:
 *              - GET  '/v1/book'
 *              - POST '/v1/book'
 *              - PUT '/v1/book/:id'
 *              - DELETE '/v1/book/:id'
 *              - GET '/v1/book/:id'
 */
import express from 'express'

import Schema from '../../middlewares/schema'
import BookValidator from '../../Components/Book/Validator/BookValidator'

import { wrapper } from '../../helpers'
import { BookController } from '../../Components/Book/Controllers/BookController'

const router = express.Router()


router.post(
  '/',
  (req, res, next) => {
    Schema.handle(req, res, next, BookValidator.createBook())
  },
  wrapper(BookController.create),
)

router.get(
  '/',
  wrapper(BookController.index),
)


router.get(
  '/:id',
  wrapper(BookController.show),
)

router.delete(
  '/:id',

  wrapper(BookController.destroy),
)

router.put(
  '/:id',
  (req, res, next) => {
    Schema.handle(req, res, next, BookValidator.editBook())
  },
  wrapper(BookController.update),
)

export default router
