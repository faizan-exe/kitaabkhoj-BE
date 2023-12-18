/**
 *        @file CustomerController.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Customer Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - CustomerService
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
import CustomerService from '../Services/CustomerService'
import { CustomerCreate, CustomerLogin } from '../Request/Customer.dto'

export class CustomerController {
  //create new Customer async func
  public static async login(req: any, res: Response) {
    const payload: CustomerLogin = req.body
    const customerService: CustomerService = new CustomerService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await customerService.login({ ...payload }))
  }
  
  public static async create(req: any, res: Response) {
    const payload: CustomerCreate = req.body
    const customerService: CustomerService = new CustomerService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await customerService.create({ ...payload }))
  }

  public static async createCustomerFinance(req: any, res: Response) {
    const payload: CustomerCreate = req.body
    const customerService: CustomerService = new CustomerService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await customerService.createCustomerFinance({ ...payload }))
  }

    public static async index(req: any, res: Response) {

    const customerService: CustomerService = new CustomerService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    let filter : any = req.query
    return response.ok(await customerService.get(filter))
  }
  
  public static async veiwCustomer(req: any, res: Response) {
    const customerService: CustomerService = new CustomerService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    const id: string = req.params.id
    return response.ok(await customerService.viewCustomer(id))
  }

  public static async update(req: any, res: Response) {
    const id: string = req.params.id
    const payload: any = req.body
    const customerService: CustomerService = new CustomerService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await customerService.update(id, { ...payload }))
  }

  public static async destroy(req: any, res: Response) {
    const id: string = req.params.id
    const customerService: CustomerService = new CustomerService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await customerService.delete(id))
  }


}
