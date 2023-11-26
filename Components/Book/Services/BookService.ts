/**
 *        @file BookService.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary BookService Class
 * @description Define Functions that perform CRUD operations on Book
 *   @functions - createBook()
 *              - getBook()
 *              - getBookID()
 *              - deleteBook()
 *              - updateBook()
 */
import messages from '../../../constants'
import { Book } from '../../../Models'
import { Op } from 'sequelize'
import { getPagination, setPagination } from '../../../helpers'


export class BookService {
  expReq?: any
  expRes?: any

  public async createBook(args: any): Promise<any> {
    try {
      const BookObj = await Book.findOne({
        where: {
          name: args.name,
        }
      })
      if (BookObj) {
        return {
          success: false,
          data: {
            message: messages.errors.recordExist,
            result: BookObj,
          },
        }
      }
      const book = await Book.create({ ...args })
      return {
        success: true,
        data: {
          message: messages.success.book.insert,
          result: book,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error } }
    }
  }

  public async getBook(args: any, filter : any): Promise<any> {
    try {
      const { per_page, current_page, offset } = setPagination(args.query)
      const total_item = await Book.count({
      });
      const paginationObj = getPagination(per_page, total_item, current_page)

      let whereCondition ={
      ...(filter?.is_visible &&{
        is_visible:filter?.is_visible,
      }),
      ...(filter?.name && filter.name.length > 1 && { name: { [Op.iLike]: `%${filter.name}%` } })
    }
      const book = await Book.findAll({
        where : whereCondition,
        limit: per_page,
        offset: offset,
        order: [['id', 'DESC']]
      })
      // return Book
      return {
        success: true,
        pagination: paginationObj,
        data: {
          message: messages.success.book.get,
          result: book,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async viewBook(id: string): Promise<any> {
    try {
      const book = await Book.findOne({
        where: {
          id
        },
      })
      return {
        success: true,
        data: {
          message: messages.success.book.get,
          result: book,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async updateBook(id: string, args: any): Promise<any> {
    try {
      const book = await Book.update(args, {
        where: {
          id
        },
        returning: true,
      })
      return {
        success: true,
        data: {
          message: messages.success.book.update,
          result: book,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async deleteBook(id: string): Promise<any> {
    try {
      await Book.destroy({
        where: {
          id
        },
      })
      return {
        success: true,
        data: { message: messages.success.book.delete },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
 
}
export default BookService
