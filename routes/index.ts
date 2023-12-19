
import { Router } from 'express'

import book from './book'
import bookshop from './bookshop'
import shopkeeper from './shopkeeper';
import customer from './customer'
import bookshopcatalog from './bookshopcatalog';
import bookshopfinance from './bookshopfinance';
import order from './order';

const router = Router()


router.use('/book', book);
router.use('/bookshop', bookshop);
router.use('/shopkeeper', shopkeeper);
router.use('/customer', customer);
router.use('/bookshopcatalog', bookshopcatalog);
router.use('/bookshopfinance', bookshopfinance);
router.use('/order', order);


export default router

