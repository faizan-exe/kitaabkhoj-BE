/**
 *        @file OrderValidator.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary Order Validator Class
 * @description Defines validation structure for Order API requests
 */

import Joi from "joi";

class OrderValidator {
  public createOrder() {
    return Joi.object({
      bookshopcatalog_id: Joi.number().required(),
      customer_id: Joi.number().required(),
      delivery_duration: Joi.number().optional(),
      bookshop_id: Joi.number().required(),
      delivery_location: Joi.string().required(),
      no_of_copies: Joi.number().optional(),
      delivered: Joi.boolean().optional(),
      price: Joi.string().required(),
    });
  }

  public editOrder() {
    return Joi.object({
      bookshopcatalog_id: Joi.number().allow(null, ""),
      customer_id: Joi.number().allow(null, ""),
      delivery_duration: Joi.number().allow(null, ""),
      delivery_location: Joi.string().allow(null, ""),
      no_of_copies: Joi.number().allow(null, ""),
      delivered: Joi.boolean().allow(null, ""),
    });
  }
}

export default new OrderValidator();
