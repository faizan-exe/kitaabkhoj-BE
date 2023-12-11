/**
 *        @file user.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary User Class
 * @description Defines the structure for user model
 */

import { Common } from './common'
import Helper from '../db_pool/helper'
import { NullableNumber, NullableString } from '../typings/types'

/**
 * User class (instances throughout code as cUser)
 *
 * This class is instantiated for each endpoint call and contains information about the user and
 * session associated with the endpoint call.
 *
 * @class User
 */

export class User extends Common {
  public username: string = ''

  public salt: NullableString = 'default'

  public hashpass: NullableString = undefined

  public role_id: NullableNumber = undefined

  public first_name: NullableString = null

  public last_name: NullableString = null

  public email: NullableString = null

  public language: NullableString = 'en'

  public contact_no: NullableString = null

  public address: NullableString = null

  public device_token: NullableString 

  public remember_token: NullableString = undefined

  constructor(model?: any) {
    super()
    if (model) {
      Helper.shallowCopy(model, this)
    }
  }
}

export default User