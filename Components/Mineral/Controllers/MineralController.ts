/**
 *        @file MineralController.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Mineral Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - MineralService
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
import MineralService from '../Services/MineralService' 
import { CreateMineralDTO, UpdateMineralDTO } from '../Request/mineral.dto'

export class MineralController {
  public static async index(req: any, res: Response) {
    const mineralService: MineralService = new MineralService()
    const filter : any = req.query
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await mineralService.getMineral(req,filter))
  }

  //create new Mineral async func
  public static async create(req: any, res: Response) {
    const payload: CreateMineralDTO = req.body
    const mineralService: MineralService = new MineralService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await mineralService.createMineral({ ...payload }))
  }

  public static async show(req: any, res: Response) {
    const id: string = req.params.id
    const mineralService: MineralService = new MineralService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await mineralService.viewMineral(id))
  }
  //Update async func
  public static async update(req: any, res: Response) {
    const id: string = req.params.id
    const payload: UpdateMineralDTO = req.body
    const mineralService: MineralService = new MineralService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await mineralService.updateMineral(id, { ...payload }))
  }
  
  //Delete async func
  public static async destroy(req: any, res: Response) {
    const id: string = req.params.id
    const mineralService: MineralService = new MineralService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await mineralService.deleteMineral(id))
  }
}
