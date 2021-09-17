/* eslint-disable babel/new-cap */
import express from 'express'
import get from 'lodash/get'
import {authenticate} from '../middlewares/auth'
import {requireTestKitOwner} from '../middlewares/test-kit'
import * as testService from '../services/test'

const router = express.Router()

router.get('/admin', authenticate({requiredAdmin: true}), async (req, res, next) => {
  try {
    const tests = await testService.getAllTestsByAdmin()
    return res.json({data: tests})
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

router.get('/all',
  authenticate(),
  requireTestKitOwner({testKitIdPath: 'query.testKitId'}),
  async (req, res, next) => {
    const testKitId = get(req, 'query.testKitId')
    try {
      const tests = await testService.getTestsByIdTestKit(testKitId)
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
