require('dotenv').config()
import { Book } from "../Models/"

// import {  } from "../Models"
// import { Category } from "../Models"

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () =>
  Promise.all([
    Book.sync({ alter: isDev || isTest }),
  ])
export default dbInit
