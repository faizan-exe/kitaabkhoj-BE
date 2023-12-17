require('dotenv').config()
import { Book } from "../Models/"
import {BookShop} from "../Models/"
import {ShopKeeper} from "../Models/"
import {BookShopCatalog} from '../Models/'
import {BookShopFinance} from '../Models/'

// import {  } from "../Models"
// import { Category } from "../Models"

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () =>
  Promise.all([
    Book.sync({ alter: isDev || isTest }),
    BookShop.sync({ alter:isDev || isTest }),
    ShopKeeper.sync({alter: isDev || isTest }),
    BookShopCatalog.sync({alter: isDev || isTest }),
    BookShopFinance.sync({alter: isDev || isTest })
  ])
export default dbInit
