/**
 *        @file ShopKeeperController.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary ShopKeeper Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - ShopKeeperService
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
import ShopKeeperService from '../Services/ShopKeeperService'
import { ShopKeeperCreate, ShopKeeperLogin } from '../Request/ShopKeeper.dto'

export class ShopKeeperController {
  //create new ShopKeeper async func
  public static async login(req: any, res: Response) {
    const payload: ShopKeeperLogin = req.body
    const shopkeeperService: ShopKeeperService = new ShopKeeperService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await shopkeeperService.login({ ...payload }))
  }
  
  public static async create(req: any, res: Response) {
    const payload: ShopKeeperCreate = req.body
    const shopkeeperService: ShopKeeperService = new ShopKeeperService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await shopkeeperService.create({ ...payload }))
  }

    public static async index(req: any, res: Response) {

    const shopkeeperService: ShopKeeperService = new ShopKeeperService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    let filter : any = req.query
    return response.ok(await shopkeeperService.get(filter))
  }
  
  public static async veiwShopKeeper(req: any, res: Response) {
    const shopkeeperService: ShopKeeperService = new ShopKeeperService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    const id: string = req.params.id
    return response.ok(await shopkeeperService.viewShopKeeper(id))
  }

  public static async update(req: any, res: Response) {
    const id: string = req.params.id
    const payload: any = req.body
    const shopkeeperService: ShopKeeperService = new ShopKeeperService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await shopkeeperService.update(id, { ...payload }))
  }

  public static async destroy(req: any, res: Response) {
    const id: string = req.params.id
    const shopkeeperService: ShopKeeperService = new ShopKeeperService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await shopkeeperService.delete(id))
  }


}
