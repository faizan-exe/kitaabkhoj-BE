/**
 *        @file BookShopValidator.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary BookShop Validator Class
 * @description Defines validation structure for BookShop API requests
 */

import Joi from 'joi'


class BookShopValidator {
  public createBookShop() {
    return Joi.object({
      location: Joi.string().required(),
      name: Joi.number().required(),
      
    })
  }  
  public editBookShop() {
    return Joi.object({
      location: Joi.string().allow(null, ''),
      name: Joi.number().allow(null, ''),
    })
  }

}

export default new BookShopValidator()