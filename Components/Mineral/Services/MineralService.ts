/**
 *        @file MineralService.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary MineralService Class
 * @description Define Functions that perform CRUD operations on Mineral
 *   @functions - createMineral()
 *              - getMineral()
 *              - getMineralID()
 *              - deleteMineral()
 *              - updateMineral()
 */
import messages from '../../../constants'
import { Mineral } from '../../../Models'
import { Op } from 'sequelize'
import { getPagination, setPagination } from '../../../helpers'


export class MineralService {
  expReq?: any
  expRes?: any

  public async createMineral(args: any): Promise<any> {
    try {
      const MineralObj = await Mineral.findOne({
        where: {
          name: args.name,
        }
      })
      if (MineralObj) {
        return {
          success: false,
          data: {
            message: messages.errors.recordExist,
            result: MineralObj,
          },
        }
      }
      const mineral = await Mineral.create({ ...args })
      return {
        success: true,
        data: {
          message: messages.success.mineral.insert,
          result: mineral,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error } }
    }
  }

  public async getMineral(args: any, filter : any): Promise<any> {
    try {
      const { per_page, current_page, offset } = setPagination(args.query)
      const total_item = await Mineral.count({
      });
      const paginationObj = getPagination(per_page, total_item, current_page)

      let whereCondition ={
      ...(filter?.is_visible &&{
        is_visible:filter?.is_visible,
      }),
      ...(filter?.name && filter.name.length > 1 && { name: { [Op.iLike]: `%${filter.name}%` } })
    }
      const mineral = await Mineral.findAll({
        where : whereCondition,
        limit: per_page,
        offset: offset,
        order: [['id', 'DESC']]
      })
      // return Mineral
      return {
        success: true,
        pagination: paginationObj,
        data: {
          message: messages.success.mineral.get,
          result: mineral,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async viewMineral(id: string): Promise<any> {
    try {
      const mineral = await Mineral.findOne({
        where: {
          id
        },
      })
      return {
        success: true,
        data: {
          message: messages.success.mineral.get,
          result: mineral,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async updateMineral(id: string, args: any): Promise<any> {
    try {
      const mineral = await Mineral.update(args, {
        where: {
          id
        },
        returning: true,
      })
      return {
        success: true,
        data: {
          message: messages.success.mineral.update,
          result: mineral,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async deleteMineral(id: string): Promise<any> {
    try {
      await Mineral.destroy({
        where: {
          id
        },
      })
      return {
        success: true,
        data: { message: messages.success.mineral.delete },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
 
}
export default MineralService
