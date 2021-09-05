/* eslint-disable babel/new-cap */
import express from 'express'
import get from 'lodash/get'
import {authenticate} from '../middlewares/auth'
import * as testService from '../services/test'

const router = express.Router()

router.post('/started', authenticate(), async (req, res, next) => {
  try {
    res.json('done')
  }
  catch (err) {
    next(err)
  }
})

router.get('/', authenticate(), async (req, res, next) => {
  const userId = get(req, 'user.id')

  try {
    const tests = await testService.getTestsByIdUser(userId)
    
    return res.json({
      data: tests
    })
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', authenticate(), async (req, res, next) => {
  const testId = get(req, 'params.id')
  try {
    const rs = await testService.getTestHistoryDetail(testId)
    
    return res.json(rs)
  }
  catch (err) {
    next(err)
  }
})

export default {
  prefix: '/v1/tests',
  routerInstance: router
}
