/**
 *        @file BookShopService.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary BookShopService Class
 * @description Define Functions that perform CRUD operations on BookShop
 *   @functions - createBookShop()
 *              - getBookShop()
 *              - getBookShopID()
 *              - deleteBookShop()
 *              - updateBookShop()
 */
import messages from '../../../constants'
import { BookShop, ShopKeeper, Book, BookShopFinance } from '../../../Models'
import { Op } from 'sequelize'
import { getPagination, setPagination } from '../../../helpers'
import Sequelize from 'sequelize'


export class BookShopService {
  expReq?: any
  expRes?: any

  public async createBookShop(args: any): Promise<any> {
    try {
      const BookShopObj = await BookShop.findOne({
        where: {
          name: args.name,
        }
      })
      if (BookShopObj) {
        return {
          success: false,
          data: {
            message: messages.errors.recordExist,
            result: BookShopObj,
          },
        }
      }
      const bookshop = await BookShop.create({ ...args })
    
      return {
        success: true,
        data: {
          message: messages.success.bookshop.insert,
          result: bookshop,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error } }
    }
  }

  public async getBookShop(args: any, filter : any): Promise<any> {
    try {
      const { per_page, current_page, offset } = setPagination(args.query)
      const total_item = await BookShop.count({
      });
      const paginationObj = getPagination(per_page, total_item, current_page)

      let whereCondition = {}
      let bookCondition  = {}


      if (filter?.searchQuery){
        bookCondition = {
          [Op.or]: [
            { title: { [Op.iLike]: `%${filter?.searchQuery}%` } },
            { author: { [Op.iLike]: `%${filter?.searchQuery}%` } },
            { iban: { [Op.iLike]: `%${filter?.searchQuery}%` } },
            { publisher: { [Op.iLike]: `%${filter?.searchQuery}%` } },
            Sequelize.literal(`genres::text ilike '%${filter?.searchQuery}%'`)
          ],
        };
      }
      const bookshop = await BookShop.findAll({
        where : whereCondition,
        limit: per_page,
        offset: offset,
        order: [['id', 'DESC']],
        include: [{model: ShopKeeper}, 
      {model: BookShopFinance}, {model: Book, where: bookCondition}]
      })
      // return BookShop
      return {
        success: true,
        pagination: paginationObj,
        data: {
          message: messages.success.bookshop.get,
          result: bookshop,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async viewBookShop(id: string): Promise<any> {
    try {
      const bookshop = await BookShop.findOne({
        where: {
          id
        },
        include: [{model: ShopKeeper}, 
          {model: BookShopFinance}, {model: Book}]
      })
      return {
        success: true,
        data: {
          message: messages.success.bookshop.get,
          result: bookshop,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async updateBookShop(id: string, args: any): Promise<any> {
    try {
      const bookshop = await BookShop.update(args, {
        where: {
          id
        },
        returning: true,
      })
      return {
        success: true,
        data: {
          message: messages.success.bookshop.update,
          result: bookshop,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async deleteBookShop(id: string): Promise<any> {
    try {
      await BookShop.destroy({
        where: {
          id
        },
      })
      return {
        success: true,
        data: { message: messages.success.bookshop.delete },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
 
}
export default BookShopService
