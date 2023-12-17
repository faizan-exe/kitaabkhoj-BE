/**
 *        @file BookShopCatalogController.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary BookShopCatalog Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - BookShopCatalogService
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
import BookShopCatalogService from '../Services/BookShopCatalogService' 
import { CreateBookShopCatalogDTO, UpdateBookShopCatalogDTO } from '../Request/BookShopCatalog.dto'

export class BookShopCatalogController {
  public static async index(req: any, res: Response) {
    const bookShopCatalogService: BookShopCatalogService = new BookShopCatalogService()
    const filter : any = req.query
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await bookShopCatalogService.getBookShopCatalog(req,filter))
  }

  //create new BookShopCatalog async func
  public static async create(req: any, res: Response) {
    const payload: CreateBookShopCatalogDTO = req.body
    const bookShopCatalogService: BookShopCatalogService = new BookShopCatalogService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await bookShopCatalogService.createBookShopCatalog({ ...payload }))
  }

  public static async show(req: any, res: Response) {
    const id: string = req.params.id
    const bookShopCatalogService: BookShopCatalogService = new BookShopCatalogService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await bookShopCatalogService.viewBookShopCatalog(id))
  }
  //Update async func
  public static async update(req: any, res: Response) {
    const id: string = req.params.id
    const payload: UpdateBookShopCatalogDTO = req.body
    const bookShopCatalogService: BookShopCatalogService = new BookShopCatalogService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await bookShopCatalogService.updateBookShopCatalog(id, { ...payload }))
  }
  
  //Delete async func
  public static async destroy(req: any, res: Response) {
    const id: string = req.params.id
    const bookShopCatalogService: BookShopCatalogService = new BookShopCatalogService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await bookShopCatalogService.deleteBookShopCatalog(id))
  }
}
