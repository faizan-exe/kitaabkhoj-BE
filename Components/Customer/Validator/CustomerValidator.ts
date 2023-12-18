/**
 *        @file blogs.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary CategoryValidator Class
 * @description Defines validation structure for Category API requests
 */

import Joi from 'joi'


class CustomerValidator {
  public login() {
    return Joi.object({
      email: Joi.string().required(),
    })
  } 
  public create() {
    return Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      delivery_address: Joi.string().required(),
    })
  }
  
  public createCustomerFinance() {
    return Joi.object({
        customer_id: Joi.number().required(),
      bank_account: Joi.string().required(),
      bank_name: Joi.string().required(),
      sadapay: Joi.string().required()

    })
  }  
}
export default new CustomerValidator()
