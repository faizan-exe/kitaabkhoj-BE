/**
 *        @file CustomerService.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary CustomerService Class
 * @description Define Functions that perform CRUD operations on Customer
 *   @functions - createCustomer()
 *              - getCustomer()
 *              - getCustomerID()
 *              - deleteCustomer()
 *              - updateCustomer()
 */
import message from '../../../constants'
import { Customer, CustomerFinance, Order } from '../../../Models'
import Auth from '../../../utility/auth'
import { Op } from 'sequelize'
import * as config from '../../../config'
const jwt = require('njwt')



export class CustomerService {
  expReq?: any
  expRes?: any


  public static async createToken(user: any): Promise<object> {

    const claims = {
      sub: user.username,
      iss: 'https://websiteapp.com',
      sbxUser: user,
      sbxPermissions: [],
    }

    const authObj = new Auth(config.server.apiUuid, config.server.tokenExpiration, user)
    const jwtObj = jwt.create(claims, authObj.tokenSecret)

    jwtObj.setExpiration(
      new Date().getTime() +
      authObj.tokenExpire!.days * 24 * 60 * 60 * 1000 +
      authObj.tokenExpire!.hours * 60 * 60 * 1000 +
      authObj.tokenExpire!.minutes * 60 * 1000 +
      authObj.tokenExpire!.seconds * 1000,
    )

    authObj.token = jwtObj.compact()
    authObj.tokenID = jwtObj.body.jti
    authObj.user = user
    // user_current = user
    return authObj.token
  }

  public async login(args: any): Promise<any> {
      const customer = await Customer.findOne({
        where: {
          email : args.email,
        },
      })
      if(!customer){
        return {
          success: false,
          data: {
            message: message.errors.emailNotExist,
          },
        }
      }
      var token = await CustomerService.createToken(Customer)
      return {
        success: true,
        data: {
          message: message.success.customer.login,
          authToken: token,
          Customer: customer
        },
      }
}


public async create(args: any): Promise<any> {
  try {
    const customer = await Customer.findOne({
      where: {
        email: args.email,
      }
    })
    if (customer) {
      return {
        success: false,
        data: {
          message: message.errors.recordExist,
          result: customer
        },
      }
    }
    const customerObj = await Customer.create({...args})
    return {
      success: true,
      data: {
        message: message.success.customer.create,
        result: customerObj,
      },
    }
  } catch (error) {
    return { success: false, data: { message: error.detail || error } }
  }
}

public async createCustomerFinance(args: any): Promise<any> {
    try {
      const customerFinance = await CustomerFinance.findOne({
        where: {
          bank_account: args.bank_account,
        }
      })
      if (customerFinance) {
        return {
          success: false,
          data: {
            message: message.errors.recordExist,
            result: customerFinance
          },
        }
      }
      const customerFinanceObj = await CustomerFinance.create({...args})
      return {
        success: true,
        data: {
          message: message.success.customer,
          result: customerFinanceObj,
        },
      }
    } catch (error) {
      return { success: false, data: { message: error.detail || error } }
    }
  }

public async get(filter : any): Promise<any> {
  try {

    let whereCondition ={
      ...(filter?.username && filter.username.length > 1 && { username: { [Op.iLike]: `%${filter.username}%` } })
    }
    const customer = await Customer.findAll({
      where : whereCondition,
      order: [['id', 'ASC']],
    })

    // return Skill
    return {
      success: true,
      data: {
        message: message.success.customer.get,
        result: customer,
      },
    }
  } catch (error) {
    return { success: false, data: { message: error.detail || error.message }, status: error.status }
  }
}

public async viewCustomer(id: string): Promise<any> {
  try {
    const customer = await Customer.findOne({
      where: {
        id
      },
      include: [{model: CustomerFinance}, {model: Order}]
    })
    return {
      success: true,
      data: {
        message: message.success.customer.get,
        result: customer,
      },
    }
  } catch (error) {
    return { success: false, data: { message: error.detail || error.message }, status: error.status }
  }
}

public async update(id: string, args: any): Promise<any> {
  try {
    const customer = await Customer.update(args, {
      where: {
        id
      },
      returning: true,
    })
    return {
      success: true,
      data: {
        message: message.success.customer.update,
        result: customer,
      },
    }
  } catch (error) {
    return { success: false, data: { message: error.detail || error.message }, status: error.status }
  }
}




public async delete(id: string): Promise<any> {
  try {
    await Customer.destroy({
      where: {
        id
      },
    })
    return {
      success: true,
      data: { message: message.success.customer.delete },
    }
  } catch (error) {
    return { success: false, data: { message: error.detail || error.message }, status: error.status }
  }
}

}


export default CustomerService
