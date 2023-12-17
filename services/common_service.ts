/**
 *        @file common_service.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary CommonService Class
 * @description Defines common functions that can be used across all services
 *   @functions - getRows()
 *              - insertRow()
 *              - insertRows()
 *              - updateRow()
 *              - getAllRows()
 *              - getById()
 *              - getBy()
 */

// import { User } from '../utility/'
import Helper from '../db_pool/helper'
import { NullableString } from '../typings/types'
import messages from '../constants'

export class CommonService {
  public type_name: string

  public type_obj: any

  public user_current: any

  constructor(_user: any) {
    this.user_current = _user
  } 

  public async getRows(sql: string, params?: Array<any>) {
    const pool = Helper.pool()
    let result: any

    try {
      if (params) result = await pool.aquery(this.user_current, sql, params)
      else result = await pool.aquery(this.user_current, sql)

      if (result.rowCount === 0) throw { message: messages.errors.notFound, status: 404 }

      return { success: true, data: { result: result.rows } }
    } catch (error) {
      console.error(`CommonService.getRows() Query: ${sql}`)
      console.error(`CommonService.getRows() Query: ${sql}`)
      return { success: false, data: { message: error.message }, status: error.status }
    }
  }

  public async insertRow(columns: string, param_ids: string, params: Array<any>) {
    const pool = Helper.pool()
    let result: any

    const sql = `INSERT INTO ${this.type_name} (${columns}) VALUES (${param_ids}) returning id`
    try {
      result = await pool.aquery(this.user_current, sql, params)
      if (result.rowCount === 0) throw { message: messages.errors.insert, status: 400 }
      return { success: true, data: { result: messages.success.insert, id: result.rows[0].id } }
    } catch (error) {
      console.error(`CommonService.insertRow() Query: ${sql}`)
      console.error(`CommonService.insertRow() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async insertRows(columns: string, param_ids: string, params: Array<any>, onconflict = '') {
    const pool = Helper.pool()
    let result: any
    let sql = `INSERT INTO ${this.type_name} (${columns}) VALUES ${param_ids} returning id`
    if (onconflict) {
      sql = `INSERT INTO ${this.type_name} (${columns}) VALUES ${param_ids} ON CONFLICT ${onconflict} returning id`
    }
    try {
      result = await pool.aquery(this.user_current, sql, params)
      if (result.rowCount === 0) throw { message: messages.errors.insert, status: 400 }
      return { success: true, data: { result: messages.success.insert, ids: result.rows } }
    } catch (error) {
      console.error(`CommonService.insertRow() Query: ${sql}`)
      console.error(`CommonService.insertRows() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async updateRow(columns: string, condition: string, params: Array<any>) {
    const pool = Helper.pool()
    let result: any

    const sql = `UPDATE ${this.type_name} SET ${columns} WHERE ${condition}`
    try {
      result = await pool.aquery(this.user_current, sql, params)
      if (result.rowCount === 0) throw { message: messages.errors.notFound, status: 404 }
      return { success: true, data: { result: messages.success.update } }
    } catch (error) {
      console.error(`CommonService.updateRow() Query: ${sql}`)
      console.error(`CommonService.updateRow() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  public async getAllRows(table_name: NullableString = null): Promise<any> {
    return this.getRows('SELECT * FROM  ' + (table_name ? table_name : this.type_name))
  }

  public getFilteredRows(condition: string, params: Array<any>): any {
    return this.getRows(`SELECT * FROM ${this.type_name} WHERE ${condition}`, params)
  }

  public getById(id: string): Promise<any> {
    return this.getBy('id', id)
  }

  public getBy(_columnName: string, _value: any): Promise<any> {
    return this.getRows(`SELECT * FROM ${this.type_name} WHERE ${_columnName} = $1 `, [_value])
  }
  public  Capitalizethefirstletter(params: string) {
    const arr = params.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    return arr.join(" ");

  }
}

export default CommonService