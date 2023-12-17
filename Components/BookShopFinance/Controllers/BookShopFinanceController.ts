/**
 *        @file BookShopFinanceController.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary BookShopFinance Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - BookShopFinanceService
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
import BookShopFinanceService from '../Services/BookShopFinanceService' 
import { CreateBookShopFinanceDTO, UpdateBookShopFinanceDTO } from '../Request/BookShopFinance.dto'

export class BookShopFinanceController {
  public static async index(req: any, res: Response) {
    const bookShopFinanceService: BookShopFinanceService = new BookShopFinanceService()
    const filter : any = req.query
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await bookShopFinanceService.getBookShopFinance(req,filter))
  }

  //create new BookShopFinance async func
  public static async create(req: any, res: Response) {
    const payload: CreateBookShopFinanceDTO = req.body
    const bookShopFinanceService: BookShopFinanceService = new BookShopFinanceService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await bookShopFinanceService.createBookShopFinance({ ...payload }))
  }

  public static async show(req: any, res: Response) {
    const id: string = req.params.id
    const bookShopFinanceService: BookShopFinanceService = new BookShopFinanceService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await bookShopFinanceService.viewBookShopFinance(id))
  }
  //Update async func
  public static async update(req: any, res: Response) {
    const id: string = req.params.id
    const payload: UpdateBookShopFinanceDTO = req.body
    const bookShopFinanceService: BookShopFinanceService = new BookShopFinanceService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await bookShopFinanceService.updateBookShopFinance(id, { ...payload }))
  }
  
  //Delete async func
  public static async destroy(req: any, res: Response) {
    const id: string = req.params.id
    const bookShopFinanceService: BookShopFinanceService = new BookShopFinanceService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await bookShopFinanceService.deleteBookShopFinance(id))
  }
}
