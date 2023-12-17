/**
 *        @file BookShopFinanceService.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary BookShopFinanceService Class
 * @description Define Functions that perform CRUD operations on BookShopFinance
 *   @functions - createBookShopFinance()
 *              - getBookShopFinance()
 *              - getBookShopFinanceID()
 *              - deleteBookShopFinance()
 *              - updateBookShopFinance()
 */
import messages from '../../../constants'
import { BookShopFinance } from '../../../Models'
import { Op } from 'sequelize'
import { getPagination, setPagination } from '../../../helpers'


export class BookShopFinanceService {
  expReq?: any
  expRes?: any

  public async createBookShopFinance(args: any): Promise<any> {
    try {
      const bookShopFinanceObj = await BookShopFinance.findOne({
        where: {
          id: args.id,
        }
      })
      if (bookShopFinanceObj) {
        return {
          success: false,
          data: {
            message: messages.errors.recordExist,
            result: bookShopFinanceObj,
          },
        }
      }
      const bookShopFinance = await BookShopFinance.create({ ...args })
    
      return {
        success: true,
        data: {
          message: messages.success.bookShopFinance.insert,
          result: bookShopFinance,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error } }
    }
  }

  public async getBookShopFinance(args: any, filter : any): Promise<any> {
    try {
      const { per_page, current_page, offset } = setPagination(args.query)
      const total_item = await BookShopFinance.count({
      });
      const paginationObj = getPagination(per_page, total_item, current_page)

      let whereCondition ={
      ...(filter?.is_visible &&{
        is_visible:filter?.is_visible,
      }),
      ...(filter?.name && filter.name.length > 1 && { name: { [Op.iLike]: `%${filter.name}%` } })
    }
      const bookShopFinance = await BookShopFinance.findAll({
        where : whereCondition,
        limit: per_page,
        offset: offset,
        order: [['id', 'DESC']],
      })
      // return BookShopFinance
      return {
        success: true,
        pagination: paginationObj,
        data: {
          message: messages.success.bookShopFinance.get,
          result: bookShopFinance,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async viewBookShopFinance(id: string): Promise<any> {
    try {
      const bookShopFinance = await BookShopFinance.findOne({
        where: {
          id
        },
       
      })
      return {
        success: true,
        data: {
          message: messages.success.bookShopFinance.get,
          result: bookShopFinance,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async updateBookShopFinance(id: string, args: any): Promise<any> {
    try {
      const bookShopFinance = await BookShopFinance.update(args, {
        where: {
          id
        },
        returning: true,
      })
      return {
        success: true,
        data: {
          message: messages.success.bookShopFinance.update,
          result: bookShopFinance,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async deleteBookShopFinance(id: string): Promise<any> {
    try {
      await BookShopFinance.destroy({
        where: {
          id
        },
      })
      return {
        success: true,
        data: { message: messages.success.bookShopFinance.delete },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
 
}
export default BookShopFinanceService
