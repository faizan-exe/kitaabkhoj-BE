/**
 *        @file common.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Common Class
 * @description Defines the structure for common fields/properties used across models
 */

import Helper from '../db_pool/helper'

import { NullableDate, NullableString } from '../typings/types'

export class Common {
  public id: NullableString = undefined

  public createdAt: NullableDate = undefined

  public deletedAt: NullableDate = undefined

  public updatedAt: NullableDate = undefined

  public _table_name: NullableString = undefined

  public copyFrom(copyObj: any) {
    Helper.shallowCopy(copyObj, this)
  }

  public setTableName(table_name: string) {
    this._table_name = table_name
  }

  public getTableName() {
    return this._table_name
  }

  /**
   * Dump this class to the log
   */
  dump() {
    console.info(this)
  }

  /**
   * Determine if this instance has a specific property
   *
   * @param {*} prop
   */
  hasUserProperty(prop: any) {
    return this.hasOwnProperty(prop)
  }
}

export default Common
