/* eslint-disable babel/new-cap */
import express from 'express'
import { authenticate } from '../middlewares/auth'
//import * as TestService from '../services/test'
//import {HTTP_STATUS_CODES} from '../utils/constants'

const router = express.Router()

router.post('/started', authenticate(), async (req, res, next) => {
  try {
    res.json('done')
  }
  catch (err) {
    next(err)
  }
})

export default {
  prefix: '/v1/tests',
  routerInstance: router
}
