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
      name: Joi.string().required(),
      price: Joi.number().required(),
      rooms: Joi.number().required(),
      is_visible: Joi.boolean().required(),
      description: Joi.string().required(),
      guest_capacity: Joi.number().required(),
      facilities: Joi.array().allow(null).items(
        Joi.string().allow(null,''),
        ),
      attachments: Joi.array().allow(null).items(
     Joi.string().allow(null,''),
      ),
      main_img: Joi.string().required(),
      is_popular: Joi.boolean().allow(null),
      ratings: Joi.number().allow(null)
      
    })
  }  
  public editBook() {
    return Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      rooms: Joi.number().required(),
      is_visible: Joi.boolean().required(),
      guest_capacity: Joi.number().required(),
      description: Joi.string().required(),
      facilities: Joi.array().allow(null).items(
        Joi.string().allow(null,''),
        ),
      attachments: Joi.array().allow(null).items(
     Joi.string().allow(null,''),
      ),
      main_img: Joi.string().allow(null, ''),
      is_popular: Joi.boolean().allow(null),
      ratings: Joi.number().allow(null)
    })
  }

}

export default new BookValidator()