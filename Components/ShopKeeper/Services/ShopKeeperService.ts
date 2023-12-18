/**
 *        @file ShopKeeperService.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary ShopKeeperService Class
 * @description Define Functions that perform CRUD operations on ShopKeeper
 *   @functions - createShopKeeper()
 *              - getShopKeeper()
 *              - getShopKeeperID()
 *              - deleteShopKeeper()
 *              - updateShopKeeper()
 */
import message from '../../../constants'
import { ShopKeeper, BookShop } from '../../../Models'
import Auth from '../../../utility/auth'
import { Op } from 'sequelize'
import * as config from '../../../config'
const jwt = require('njwt')



export class ShopKeeperService {
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
      const shopkeeper = await ShopKeeper.findOne({
        where: {
          email : args.email,
        },
      })
      if(!ShopKeeper){
        return {
          success: false,
          data: {
            message: message.errors.emailNotExist,
          },
        }
      }
      var token = await ShopKeeperService.createToken(shopkeeper)
      return {
        success: true,
        data: {
          message: message.success.ShopKeeper.login,
          authToken: token,
          ShopKeeper: shopkeeper
        },
      }
}


public async create(args: any): Promise<any> {
  try {
    const shopkeeper = await ShopKeeper.findOne({
      where: {
        email: args.email,
      }
    })
    if (shopkeeper) {
      return {
        success: false,
        data: {
          message: message.errors.recordExist,
          result: shopkeeper
        },
      }
    }
    const ShopKeeperObj = await ShopKeeper.create({...args})
    return {
      success: true,
      data: {
        message: message.success.ShopKeeper.create,
        result: ShopKeeperObj,
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
    const shopkeeper = await ShopKeeper.findAll({
      where : whereCondition,
      order: [['id', 'ASC']],
      include: [{model: BookShop}]
    })

    // return Skill
    return {
      success: true,
      data: {
        message: message.success.ShopKeeper.get,
        result: shopkeeper,
      },
    }
  } catch (error) {
    return { success: false, data: { message: error.detail || error.message }, status: error.status }
  }
}

public async viewShopKeeper(id: string): Promise<any> {
  try {
    const shopkeeper = await ShopKeeper.findOne({
      where: {
        id
      },
      include: [{model: BookShop}]
    })
    return {
      success: true,
      data: {
        message: message.success.ShopKeeper.get,
        result: shopkeeper,
      },
    }
  } catch (error) {
    return { success: false, data: { message: error.detail || error.message }, status: error.status }
  }
}

public async update(id: string, args: any): Promise<any> {
  try {
    const shopkeeper = await ShopKeeper.update(args, {
      where: {
        id
      },
      returning: true,
    })
    return {
      success: true,
      data: {
        message: message.success.ShopKeeper.update,
        result: shopkeeper,
      },
    }
  } catch (error) {
    return { success: false, data: { message: error.detail || error.message }, status: error.status }
  }
}




public async delete(id: string): Promise<any> {
  try {
    await ShopKeeper.destroy({
      where: {
        id
      },
    })
    return {
      success: true,
      data: { message: message.success.ShopKeeper.delete },
    }
  } catch (error) {
    return { success: false, data: { message: error.detail || error.message }, status: error.status }
  }
}

}


export default ShopKeeperService
