require('dotenv').config()
import { Mineral } from "../Models/"

// import {  } from "../Models"
// import { Category } from "../Models"

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () =>
  Promise.all([
    Mineral.sync({ alter: isDev || isTest }),
  ])
export default dbInit
