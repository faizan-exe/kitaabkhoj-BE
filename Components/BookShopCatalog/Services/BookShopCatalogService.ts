/**
 *        @file BookShopCatalogService.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary BookShopCatalogService Class
 * @description Define Functions that perform CRUD operations on BookShopCatalog
 *   @functions - createBookShopCatalog()
 *              - getBookShopCatalog()
 *              - getBookShopCatalogID()
 *              - deleteBookShopCatalog()
 *              - updateBookShopCatalog()
 */
import messages from '../../../constants'
import { BookShopCatalog, BookMedia } from '../../../Models'
import { Op } from 'sequelize'
import { getPagination, setPagination } from '../../../helpers'


export class BookShopCatalogService {
  expReq?: any
  expRes?: any

  public async createBookShopCatalog(args: any): Promise<any> {
    try {
      const bookShopCatalogObj = await BookShopCatalog.findOne({
        where: {
          bookshop_id: args.bookshop_id,
          book_id: args.book_id
        }
      })
      if (bookShopCatalogObj) {
        return {
          success: false,
          data: {
            message: messages.errors.recordExist,
            result: bookShopCatalogObj,
          },
        }
      }
      const bookShopCatalog = await BookShopCatalog.create({ ...args })
    
      return {
        success: true,
        data: {
          message: messages.success.bookShopCatalog.insert,
          result: bookShopCatalog,
        },
      }
    }
     catch (error) {
      return { success: false, data: { message: error.detail || error } }
    }
  }

  public async createBookMedia(args: any): Promise<any> {
    try {
      const bookMedia = await BookMedia.findOne({
        where: {
          bookshopcatalog_id: args.bookshopcatalog_id,
        }
      })
      if (bookMedia) {
        return {
          success: false,
          data: {
            message: messages.errors.recordExist,
            result: bookMedia,
          },
        }
      }
      const bookMediaObj = await BookMedia.create({ ...args })
    
      return {
        success: true,
        data: {
          message: messages.success.bookShopCatalog.insert,
          result: bookMediaObj,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error } }
    }
  }

  public async getBookShopCatalog(args: any, filter : any): Promise<any> {
    try {
      const { per_page, current_page, offset } = setPagination(args.query)
      const total_item = await BookShopCatalog.count({
      });
      const paginationObj = getPagination(per_page, total_item, current_page)

      let whereCondition ={
      ...(filter?.is_visible &&{
        is_visible:filter?.is_visible,
      }),
      ...(filter?.name && filter.name.length > 1 && { name: { [Op.iLike]: `%${filter.name}%` } })
    }
      const bookShopCatalog = await BookShopCatalog.findAll({
        where : whereCondition,
        limit: per_page,
        offset: offset,
        order: [['id', 'DESC']],
        include: [{model: BookMedia}]

      })
      // return BookShopCatalog
      return {
        success: true,
        pagination: paginationObj,
        data: {
          message: messages.success.bookShopCatalog.get,
          result: bookShopCatalog,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async viewBookShopCatalog(id: string): Promise<any> {
    try {
      const bookShopCatalog = await BookShopCatalog.findOne({
        where: {
          id
        },
        include: [{model: BookMedia}]
       
      })
      return {
        success: true,
        data: {
          message: messages.success.bookShopCatalog.get,
          result: bookShopCatalog,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async updateBookShopCatalog(id: string, args: any): Promise<any> {
    try {
      const bookShopCatalog = await BookShopCatalog.update(args, {
        where: {
          id
        },
        returning: true,
      })
      return {
        success: true,
        data: {
          message: messages.success.bookShopCatalog.update,
          result: bookShopCatalog,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async deleteBookShopCatalog(id: string): Promise<any> {
    try {
      await BookShopCatalog.destroy({
        where: {
          id
        },
      })
      return {
        success: true,
        data: { message: messages.success.bookShopCatalog.delete },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
 
}
export default BookShopCatalogService
