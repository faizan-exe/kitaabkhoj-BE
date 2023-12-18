/**
 *        @file Customer/index.ts
 *     @summary Customer routes
 * @description Handles following routes:
 *              - POST 'Customer/login'

 */
import express from 'express'
import Schema from '../../middlewares/schema'
import CustomerValidator from '../../Components/Customer/Validator/CustomerValidator'
import { wrapper } from '../../helpers'
import { CustomerController } from '../../Components/Customer/Controllers/CustomerController'


const router = express.Router()

router.post(
  '/login',
  (req, res, next) => {
    Schema.handle(req, res, next, CustomerValidator.login())
  },
  wrapper(CustomerController.login),
)



router.post(
  '/create',
  (req, res, next) => {
    Schema.handle(req, res, next, CustomerValidator.create())
  },
  wrapper(CustomerController.create),
)

router.post(
    '/create/customer-finance',
    (req, res, next) => {
        Schema.handle(req, res, next, CustomerValidator.createCustomerFinance())
      },
    wrapper(CustomerController.createCustomerFinance),
)

router.get(
  '/',
  wrapper(CustomerController.index),
)


router.put(
  '/:id',
  wrapper(CustomerController.update),
)

router.get(
  '/:id',
  wrapper(CustomerController.veiwCustomer),
)

router.delete(
  '/:id',
  wrapper(CustomerController.destroy),
)
export default router
