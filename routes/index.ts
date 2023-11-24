
import { Router } from 'express'

import mineral from './mineral'

const router = Router()


router.use('/mineral', mineral);


export default router

