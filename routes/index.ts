
import { Router } from 'express'

import book from './book'
import bookshop from './bookshop'

const router = Router()


router.use('/book', book);
router.use('/bookshop', bookshop);


export default router

