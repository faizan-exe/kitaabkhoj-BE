
import { Router } from 'express'

import book from './book'
import bookshop from './bookshop'
import shopkeeper from './shopkeeper';

const router = Router()


router.use('/book', book);
router.use('/bookshop', bookshop);
router.use('/shopkeeper', shopkeeper)


export default router

