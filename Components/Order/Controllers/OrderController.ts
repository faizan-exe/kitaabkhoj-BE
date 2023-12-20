/**
 *        @file OrderController.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Order Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - OrderService
 *   @functions - index()
 *              - create()
 *              - show()
 *              - update()
 *              - destroy()
 *
 *     @returns Express JSON Response
 */

import { Response } from 'express'
// import { CUserAuthInfoRequest } from '../../../db_pool/helper'
import { ResponseWrapper } from '../../../helpers/response_wrapper'
import OrderService from '../Services/OrderService' 
import { CreateOrderDTO, UpdateOrderDTO } from '../Request/Order.dto'

export class OrderController {
  public static async index(req: any, res: Response) {
    const orderService: OrderService = new OrderService();
    const filter: any = req.query;
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await orderService.getOrder(req, filter));
  }

  //create new Order async func
  public static async create(req: any, res: Response) {
    const payload: CreateOrderDTO = req.body;
    const orderService: OrderService = new OrderService();
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.created(await orderService.createOrder({ ...payload }));
  }

  public static async show(req: any, res: Response) {
    const id: string = req.params.id;
    const orderService: OrderService = new OrderService();
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.ok(await orderService.viewOrder(id));
  }

  public static async showCustomerOrders(req: any, res: Response) {
    const id: string = req.params.id;
    const orderService: OrderService = new OrderService();
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.ok(await orderService.viewCustomerOrder(id));
  }

  public static async showShopOrders(req: any, res: Response) {
    const id: string = req.params.id;
    const orderService: OrderService = new OrderService();
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.ok(await orderService.viewShopOrder(id));
  }


  //Update async func
  public static async update(req: any, res: Response) {
    const id: string = req.params.id;
    const payload: UpdateOrderDTO = req.body;
    const orderService: OrderService = new OrderService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created(await orderService.updateOrder(id, { ...payload }));
  }

  //Delete async func
  public static async destroy(req: any, res: Response) {
    const id: string = req.params.id;
    const orderService: OrderService = new OrderService();
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.created(await orderService.deleteOrder(id));
  }
}
