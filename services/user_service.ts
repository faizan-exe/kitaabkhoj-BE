/**
 *        @file user_service.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary UserService Class
 * @description Define Functions that perform CRUD operations on Users
 *   @functions - createToken()
 *              - verifyToken()
 *              - decodeToken()
 *              - responseObject()
 *              - getAllUsers()
 *              - addUser()
 *              - login()
 *              - whoami()
 *              - getUserAndAuthToken()
 *              - forgotPassword()
 *              - changePassword()
 *              - getPermissions()
 *              - getDefaultUser()
 *              - verifyUser()
 */
require('dotenv').config()
// import Helper from '../db_pool/helper'
import * as config from '../config'
// import bcrypt from 'bcrypt';
import { Auth } from '../utility'
// import messages from '../constants'
import { CommonService } from '../services'
import { TokenBody } from '../typings/interface'
// import { Role, User } from '../Models'


// import UserServices from '../Components/User/Services/UserService'
// import bcrypt from 'bcrypt';
// import { Role } from '../Models'


const jwt = require('njwt')

export class userService extends CommonService {
  expReq?: any

  expRes?: any

  constructor(_user: any) {
    super(_user)
  }

  public static async createToken(user: any): Promise<object> {
    // delete user.auth

    // const permissionsResult = await UserService.getPermissions(user.username || '')
    // const _sbxPermisisons = new Array<string>()

    // if (permissionsResult.success) {
    //   permissionsResult.data.rows?.forEach((element) => {
    //     _sbxPermisisons.push(element.name)
    //   })
    // }

    const claims = {
      sub: user.username,
      iss: 'https://websiteapp.com',
      sbxUser: user,
      sbxPermissions: [],
    }

    const authObj: Auth = new Auth(config.server.apiUuid, config.server.tokenExpiration, user)
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

  public static verifyToken(token: any): TokenBody {
    try {
      const verifiedToken = jwt.verify(token, config.server.apiUuid)
      return { success: true, tokenBody: verifiedToken.body }
    } catch (err) {
      return { success: false, error: err }
    }
  }

  // Gets user details AND auth token
  // public static async verifyUser(
  //   username: string,
  // ): Promise<any> {
  //   // const result =  this.verifyUser(verifiedToken.body.sbxUser.username, '', true, false)
  //   const pool = Helper.pool()
  //   const cUser = Helper.defaultUser()
  //   try {
  //     // let sql = `SELECT *, true AS is_admin FROM "Users"
  //     // where "deletedAt" is null
  //     // AND username = 'khuram96'`

  //     let sql = `SELECT *, true AS is_admin FROM "Users"
  //     where "deletedAt" is null
  //     AND username = '${username}'`
      
  //     // let params = [username]
  //     const query_results = await pool.aquery(cUser, sql)
      
  //     if (query_results.rowCount <= 0) {

  //       throw { message: messages.errors.user.invalidUserPassword, status: 400 }
  //     }
  //     const user = Helper.getUser(query_results.rows[0])
  //     return {
  //       success: true,
  //       data: user,
  //     }
  //   } catch (error) {
  //     return { success: false, data: { message: error.message }, status: error.status }
  //   }
  // // }

  public static decodeToken(tokenBody: any): object {
    const dateNow = new Date()
    const timeNow = Math.round(dateNow.getTime() / 1000)
    const secsRem = tokenBody.exp - timeNow

    const authObj: Auth = new Auth(config.server.apiUuid, config.server.tokenExpiration)
    authObj.user = tokenBody.sbxUser
    authObj.permissions = tokenBody.sbxPermissions
    authObj.username = tokenBody.sub
    authObj.expireSecs = secsRem
    authObj.tokenIssuedAt = new Date(tokenBody.iat * 1000)
    authObj.tokenID = tokenBody.jti

    return authObj
  }

  public responseObject(data: any) {
    return {
      id: data.id,
      username: data.username,
      userType: 'admin',
    }
  }

  // get all Users
  // public async getAllUsers(): Promise<any> {
  //   const sql = `SELECT Users.id, Users.username, Users.deletedat,
	// 		CASE roles.name WHEN 'admin' THEN TRUE ELSE false END AS is_admin,
	// 		roles.id AS role_id, roles.name AS role_name
	// 		FROM Users
	// 		LEFT OUTER JOIN user_roles on user_roles.user_id = Users.id AND user_roles.deletedat is null 
	// 		LEFT OUTER JOIN roles on roles.id = user_roles.role_id AND roles.deletedat is null 
	// 		WHERE Users.deletedat is null `

  //   const pool = Helper.pool()
  //   const query_results = await pool.aquery(this.user_current, sql)

  //   return {
  //     success: true,
  //     data: query_results.rows,
  //   }
  // }



  // login using username AND password AND get user details AND auth token
  public static async login(username: string, password: string, is_admin: boolean = false) {
    console.log("HERE hassan",username,password,is_admin)
    // return this.getUserAndAuthToken(username, password, false, false, is_admin)
  }

  // // get user AND auth token without password
  public static async refreshToken(username: string) {
    console.log("HERE hassan",username,)

    // return this.getUserAndAuthToken(username, '', false, true)
  }

  // Get user details
  // public static async whoami(username: string) {
  //   return this.getUserAndAuthToken(username, '', true, false)
  // }

  
  // Gets user details AND auth token
  // public static async getUserAndAuthToken(
  //   username: string,
  //   password = '',
  //   is_whomai = false,
  //   is_authenticate_without_password = false,

  //   is_admin = false
  // ) {
  //   console.log(is_authenticate_without_password)

  //   try {
  //     const getUser = await User.findOne({
  //       where: {
  //         email: username,
  //       },
  //       include: [
  //       { model: Role }
  //       ]

  //     })

  //     if (getUser) {
  //       // bcrypt.compareSync(password, getUser?.hashpass)
  //       if (!bcrypt.compareSync(password, getUser?.hashpass)) {
  //         // throw custom error with name Unauthorized:
  //         throw { message: messages.errors.user.invalidPassword, status: 400 }
  //       }
  //     } else {
  //       throw { message: messages.errors.user.invalidUser, status: 400 }
  //     }
  //     if (is_admin) { 
  //       // if (getUser['Role'].name != 'Admin') { 
  //         throw { message: messages.errors.user.invalidUser, status: 400 }
  //       // }
  //     }

  //     const token = await userService.createToken(getUser)

  //     if (!is_whomai) {
  //       return {
  //         success: true,
  //         data: {
  //           message: messages.success.user.login,
  //           authToken: token,
  //           user: getUser
  //           // userObj: getUser
  //         },
  //       }
  //     }
  //     return {
  //       success: true,
  //       data: { getUser },
  //     }
  //   } catch (error) {
  //     return { success: false, data: { message: error.message }, status: error.status }
  //   }
  // }


  // Changes password for given user after verifying old password is matching current password
  // public async changePassword(_username: string, oldPassword: string, newPassword: string) {
  //   try {
  //     const getUser = await User.findOne({
  //       where: {
  //         email: _username,
  //       }
  //     })
  //     if (getUser) {
  //       if (!bcrypt.compareSync(oldPassword, getUser?.hashpass)) {
  //         // throw custom error with name Unauthorized:
  //         throw { message: messages.errors.user.invalidPassword, status: 400 }
  //       } else {
  //         const hashedPassword = await bcrypt.hash(newPassword, config.bcryptRounds.saltRounds);
  //         await getUser.update({ hashpass: hashedPassword })
  //         return {
  //           success: true,
  //           data: { message: messages.success.user.password },
  //         }
  //       }
  //     } else {
  //       throw { message: messages.errors.user.invalidUser, status: 400 }

  //     }
  //   } catch (error) {
  //     return { success: false, data: { message: error.message }, status: error.status }
  //   }

  // }

  // public static async getPermissions(usernameOrEmail: string) {
  //   const pool = Helper.pool()
  //   const objSysAdmin = Helper.defaultUser()
  //   const sql = `SELECT distinct name FROM permissions 
	// 		INNER JOIN role_permissions on permissions.id = role_permissions.permission_id
	// 		INNER JOIN user_roles on role_permissions.role_id = user_roles.role_id 
	// 		INNER JOIN Users on user_roles.user_id = Users.id
	// 		WHERE  Users.username = $1 `
  //   const result = await pool.aquery(objSysAdmin, sql, [usernameOrEmail])

  //   if (result.rowCount > 0) {
  //     return {
  //       success: true,
  //       data: {
  //         message: `Permissions for user ${usernameOrEmail}`,
  //         rows: result.rows,
  //       },
  //     }
  //   }

  //   return {
  //     success: false,
  //     data: {
  //       message: messages.success.user.email,
  //     },
  //   }
  // }

  // public getDefaultUser(reset?: boolean) {
  //   if (reset || !this.user_current || !this.user_current.id || !this.user_current.username) {
  //     this.user_current = new User()
  //     this.user_current.username = 'user_default'
  //   }

  //   return this.user_current
  // }

  // public async updateUser(user: User) {
  //   const pool = Helper.pool()

  //   if (!/\S+@\S+\.\S+/.test(user.username || '')) {
  //     return { success: false, data: { message: messages.errors.user.email } }
  //   }
  //   try {
  //     // begin transaction
  //     await Helper.beginTransaction(pool, this.user_current)
  //     let user_columns = `username = '${user.username}'`

  //     if (user.hashpass) user_columns += `, hashpass = '${user.hashpass}'`
  //     // update Users
  //     const user_sql = `UPDATE Users SET ${user_columns} WHERE id = '${user.id}'`

  //     const res = await pool.aquery(this.user_current, user_sql, [])
  //     if (!res.rowCount) throw { message: 'User does not exist', status: 404 }

  //     const roles_columns = `role_id = '${user.role_id}'`
  //     // update user_roles
  //     const roles_sql = `UPDATE user_roles SET ${roles_columns} WHERE user_id = '${user.id}'`

  //     await pool.aquery(this.user_current, roles_sql, [])

  //     //commit transaction
  //     await Helper.commitTransaction(pool, this.user_current)
  //     return { success: true, data: { message: messages.success.update } }
  //   } catch (error) {
  //     logger.error(`UserService.updateUser() Error: ${error}`)
  //     return { success: false, data: { message: error.detail || error.message }, status: error.status }
  //   }
  // }

  public async getAllRoles(): Promise<any> {
    return await this.getRows('select id, name, label, description, rank, active from roles', [])
  }
}

export default userService
