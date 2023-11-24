require('dotenv').config()
import { Dialect, Sequelize } from 'sequelize'
import { ORMDBPool } from './ORMDBPool'


const isTest = process.env.NODE_ENV === 'test'

const dbName = isTest ? ORMDBPool.test_database as string : ORMDBPool.database as string
const dbUser = ORMDBPool.username as string
const dbHost = ORMDBPool.host
const dbDriver = ORMDBPool.driver as Dialect
const dbPassword = ORMDBPool.password
const dbPort= ORMDBPool.port as number 




const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  port: dbPort,
  logging: false,
  dialectOptions: {
    statement_timeout: 7000,
    idle_in_transaction_session_timeout: 9000,
    //require 
    // ssl: {
    //   require: true,

    //   rejectUnauthorized: false,
    // },
  
  },
  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

 

  
  // define: {hooks}
})

export default sequelizeConnection
