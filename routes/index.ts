
import { Router } from 'express'

import book from './book'
import bookshop from './bookshop'
import shopkeeper from './shopkeeper';
import customer from './customer'
import bookshopcatalog from './bookshopcatalog';
import bookshopfinance from './bookshopfinance';

const router = Router()


router.use('/book', book);
router.use('/bookshop', bookshop);
router.use('/shopkeeper', shopkeeper);
router.use('/customer', customer);
router.use('/bookshopcatalog', bookshopcatalog);
router.use('/bookshopfinance', bookshopfinance);


export default router

