/**
 *        @file BookValidator.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary Book Validator Class
 * @description Defines validation structure for Book API requests
 */

import Joi from 'joi'


class BookValidator {
  public createBook() {
    return Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      iban: Joi.number().optional(),
      published_date: Joi.string().optional(),
      genre: Joi.array().required(),
      publisher: Joi.string().optional()
    })
  }  
  public editBook() {
    return Joi.object({
      title: Joi.string().allow(null),
      author: Joi.string().allow(null),
      iban: Joi.number().allow(null),
      published_date: Joi.string().allow(null),
      genre: Joi.array().allow(null),
      publisher: Joi.string().allow(null)
    })
  }

}

export default new BookValidator()