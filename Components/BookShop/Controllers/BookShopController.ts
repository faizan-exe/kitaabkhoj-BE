/**
 *        @file BookShopController.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary BookShop Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - BookShopService
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
import BookShopService from '../Services/BookShopService' 
import { CreateBookShopDTO, UpdateBookShopDTO } from '../Request/BookShop.dto'

export class BookShopController {
  public static async index(req: any, res: Response) {
    const bookShopService: BookShopService = new BookShopService()
    const filter : any = req.query
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await bookShopService.getBookShop(req,filter))
  }

  //create new BookShop async func
  public static async create(req: any, res: Response) {
    const payload: CreateBookShopDTO = req.body
    const bookShopService: BookShopService = new BookShopService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await bookShopService.createBookShop({ ...payload }))
  }

  public static async show(req: any, res: Response) {
    const id: string = req.params.id
    const bookShopService: BookShopService = new BookShopService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await bookShopService.viewBookShop(id))
  }
  //Update async func
  public static async update(req: any, res: Response) {
    const id: string = req.params.id
    const payload: UpdateBookShopDTO = req.body
    const bookShopService: BookShopService = new BookShopService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await bookShopService.updateBookShop(id, { ...payload }))
  }
  
  //Delete async func
  public static async destroy(req: any, res: Response) {
    const id: string = req.params.id
    const bookShopService: BookShopService = new BookShopService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await bookShopService.deleteBookShop(id))
  }
}
