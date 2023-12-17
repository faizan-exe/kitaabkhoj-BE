/**
 *        @file BookShopCatalogValidator.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary BookShopCatalog Validator Class
 * @description Defines validation structure for BookShopCatalog API requests
 */

import Joi from 'joi'


class BookShopCatalogValidator {
  public createBookShopCatalog() {
    return Joi.object({
        book_id: Joi.number().required(),
        bookshop_id: Joi.number().required(),
        in_stock: Joi.number().required(),
        sold_copies: Joi.number().required(),
        unit_price: Joi.number().required(),
        used: Joi.boolean().allow(null, '')
      
    })
  }  
  public editBookShopCatalog() {
    return Joi.object({
      book_id: Joi.number().allow(null, ''),
      bookshop_id: Joi.number().allow(null, ''),
      in_stock: Joi.number().allow(null, ''),
      sold_copies: Joi.number().allow(null, ''),
      unit_price: Joi.number().allow(null, ''),
      used: Joi.boolean().allow(null, '')
    })
  }

}

export default new BookShopCatalogValidator()