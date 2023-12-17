
import { Router } from 'express'

import book from './book'
import bookshop from './bookshop'
import shopkeeper from './shopkeeper';
import bookshopcatalog from './bookshopcatalog';

const router = Router()


router.use('/book', book);
router.use('/bookshop', bookshop);
router.use('/shopkeeper', shopkeeper);
router.use('/bookshopcatalog', bookshopcatalog);


export default router

