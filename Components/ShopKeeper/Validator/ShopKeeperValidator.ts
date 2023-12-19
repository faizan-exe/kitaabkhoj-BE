/**
 *        @file blogs.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary CategoryValidator Class
 * @description Defines validation structure for Category API requests
 */

import Joi from 'joi'


class ShopKeeperValidator {
  public login() {
    return Joi.object({
      email: Joi.string().required(),
    })
  } 
  public create() {
    return Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
      phone_no: Joi.string().required(),
    })
  }  
}
export default new ShopKeeperValidator()
