/**
 *        @file BookShopFinanceValidator.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary BookShopFinance Validator Class
 * @description Defines validation structure for BookShopFinance API requests
 */

import Joi from 'joi'


class BookShopFinanceValidator {
  public createBookShopFinance() {
    return Joi.object({
        bookshop_id: Joi.number().required(),
        bank_name: Joi.string().required(),
        bank_account: Joi.string().required(),
        sadapay: Joi.string().allow(null, '')
    
      
    })
  }  
  public editBookShopFinance() {
    return Joi.object({
        bookshop_id: Joi.number().allow(null, ''),
        bank_name: Joi.string().allow(null, ''),
        bank_account: Joi.string().allow(null, ''),
        sadapay: Joi.string().allow(null, '')
    })
  }

}

export default new BookShopFinanceValidator()