require('dotenv').config()
import { Book} from "../Models/"
import {BookShop} from "../Models/"
import {ShopKeeper} from "../Models/"
import {BookShopCatalog} from '../Models/'
import {BookShopFinance} from '../Models/'
import {Customer} from '../Models'
import {CustomerFinance} from '../Models/'
import {Order} from '../Models/'
import {BookMedia} from '../Models/'

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
    BookShopFinance.sync({alter: isDev || isTest }),
    Customer.sync({alter: isDev || isTest }),
    CustomerFinance.sync({alter: isDev || isTest }),
    Order.sync({alter: isDev || isTest }),
    BookMedia.sync({alter: isDev || isTest })

  ])
export default dbInit
