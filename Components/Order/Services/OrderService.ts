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
import { Order, Customer, BookShopCatalog} from '../../../Models'
import { Op } from 'sequelize'
import { getPagination, setPagination } from '../../../helpers'


export class OrderService {
  expReq?: any
  expRes?: any

  public async createOrder(args: any): Promise<any> {
    // try {
    //   const orderObj = await Order.findOne({
    //     where: {
    //       bookshopcatalog_id: args.bookshopcatalog_id,
    //       customer_id: args.customer_id
    //     }
    //   })
    //   if (orderObj) {
    //     return {
    //       success: false,
    //       data: {
    //         message: messages.errors.recordExist,
    //         result: orderObj,
    //       },
    //     }
    //   }

     const bookCatalog = await BookShopCatalog.findByPk(args.bookshopcatalog_id);
     if (!bookCatalog || args.no_of_copies > bookCatalog.in_stock) {
       return {
         success: false,
         data: {
           message: "Insufficient stock available",
         },
       };
     }

     // Create the order
     const order = await Order.create({ ...args });

     
     await BookShopCatalog.update(
       { in_stock: bookCatalog.in_stock - args.no_of_copies },
       { where: { id: args.bookshopcatalog_id } }
     );

    
      return {
        success: true,
        data: {
          message: messages.success.order.insert,
          result: order,
        },
      }
    // } catch (error) {
    //   return { success: false, data: { message: error.detail || error } }
    // }
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
        include: [{model: Customer}]

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
        include: [{model: Customer}]
      
       
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
