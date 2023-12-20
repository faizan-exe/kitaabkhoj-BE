/**
 *        @file BookController.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Book Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - BookService
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
import BookService from '../Services/BookService' 
import { CreateBookDTO, UpdateBookDTO } from '../Request/book.dto'

export class BookController {
  public static async index(req: any, res: Response) {
    const bookService: BookService = new BookService();
    const filter: any = req.query;
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await bookService.getBook(req, filter));
  }

  //create new Book async func
  public static async create(req: any, res: Response) {
    const payload: CreateBookDTO = req.body;
    const bookService: BookService = new BookService();
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.created(await bookService.createBook({ ...payload }));
  }

  public static async uploadImage(req: any, res: Response) {
    const payload = req;
    const bookService: BookService = new BookService();
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.ok(await bookService.uploadImage(payload));
  }

  
  public static async show(req: any, res: Response) {
    const id: string = req.params.id;
    const bookService: BookService = new BookService();
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.ok(await bookService.viewBook(id));
  }
  //Update async func
  public static async update(req: any, res: Response) {
    const id: string = req.params.id;
    const payload: UpdateBookDTO = req.body;
    const bookService: BookService = new BookService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created(await bookService.updateBook(id, { ...payload }));
  }

  //Delete async func
  public static async destroy(req: any, res: Response) {
    const id: string = req.params.id;
    const bookService: BookService = new BookService();
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.created(await bookService.deleteBook(id));
  }
}
