/**
 *        @file OrderService.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary OrderService Class
 * @description Define Functions that perform CRUD operations on Order
 *   @functions - createOrder()
 *              - getOrder()
 *              - getOrderID()
 *              - deleteOrder()
 *              - updateOrder()
 */
import messages from '../../../constants'
import { Order, ShopKeeper, BookShopCatalog, Book, BookShop} from '../../../Models'
import { Op } from 'sequelize'
import { getPagination, setPagination } from '../../../helpers'


export class OrderService {
  expReq?: any
  expRes?: any

  public async createOrder(args: any): Promise<any> {
    try {
      const orderObj = await Order.findOne({
        where: {
          id: args.id,
        }
      })
      if (orderObj) {
        return {
          success: false,
          data: {
            message: messages.errors.recordExist,
            result: orderObj,
          },
        }
      }
      const order = await Order.create({ ...args })
    
      return {
        success: true,
        data: {
          message: messages.success.order.insert,
          result: order,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error } }
    }
  }

  public async getOrder(args: any, filter : any): Promise<any> {
    try {
      const { per_page, current_page, offset } = setPagination(args.query)
      const total_item = await Order.count({
      });
      const paginationObj = getPagination(per_page, total_item, current_page)

      let whereCondition ={
      ...(filter?.is_visible &&{
        is_visible:filter?.is_visible,
      }),
      ...(filter?.name && filter.name.length > 1 && { name: { [Op.iLike]: `%${filter.name}%` } })
    }
      const order = await Order.findAll({
        where : whereCondition,
        limit: per_page,
        offset: offset,
        order: [['id', 'DESC']],

      })
      // return Order
      return {
        success: true,
        pagination: paginationObj,
        data: {
          message: messages.success.order.get,
          result: order,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async viewOrder(id: string): Promise<any> {
    try {
      const order = await Order.findOne({
        where: {
          id
        },
        include: [{model: ShopKeeper}, {model: BookShopCatalog, include: [
          {
            model: Book,
          },
          {
            model: BookShop,
          }
        ]}]
      
       
      })
      return {
        success: true,
        data: {
          message: messages.success.order.get,
          result: order,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async updateOrder(id: string, args: any): Promise<any> {
    try {
      const order = await Order.update(args, {
        where: {
          id
        },
        returning: true,
      })
      return {
        success: true,
        data: {
          message: messages.success.order.update,
          result: order,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async deleteOrder(id: string): Promise<any> {
    try {
      await Order.destroy({
        where: {
          id
        },
      })
      return {
        success: true,
        data: { message: messages.success.order.delete },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
 
}
export default OrderService
