/* eslint-disable babel/new-cap */
import express from 'express'
import get from 'lodash/get'
import {authenticate} from '../middlewares/auth'
import * as QuestionService from '../services/question'
import * as TestKitService from '../services/test-kit'
import {HTTP_STATUS_CODES} from '../utils/constants'
import {examHasStart, overExamTime} from '../utils/date'
import {questionToTestClient} from '../utils/test-kit'

const router = express.Router()

router.get('/', authenticate(), async (req, res, next) => {
  const userId = get(req, 'user.id')
  try {
    const testKits = await TestKitService.getTestKit(userId)
    res.json(testKits)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', authenticate(), async (req, res, next) => {
  const idTestKit = +req.params.id
  const idUser = get(req, 'user.id')
  try {
    const testKits = await TestKitService.getDetailTestKitByUserCreated(idTestKit, idUser)

    if (!testKits) return res.status(HTTP_STATUS_CODES.NOT_FOUND).end()
    
    res.json(testKits)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', authenticate(), async (req, res, next) => {
  const payload = req.body
  payload.createdBy = get(req, 'user.id')
  
  try {
    const testKit = await TestKitService.createTestKit(payload)
    res.json(testKit)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', authenticate(), async (req, res, next) => {
  const userId = get(req, 'user.id')
  if (userId !== get(req, 'body.createdBy')) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).end()
  }

  const idTestKit = +req.params.id
  const payload = req.body
  
  try {
    const testKit = await TestKitService.getDetailTestKitById(idTestKit)
    
    if (!testKit) return res.status(HTTP_STATUS_CODES.NOT_FOUND).end()

    if (testKit.createdBy !== userId) return res.status(HTTP_STATUS_CODES.FORBIDDEN).end()

    if (examHasStart(testKit?.dataValues?.startDate)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: 'The exam has started'})
    }
    
    await TestKitService.updateTestKit(payload, idTestKit)
    res.json({message: 'Update success'})
  }
  catch (err) {
    next(err)
  }
})

router.delete('/:id', authenticate(), async (req, res, next) => {
  const userId = get(req, 'user.id')
  const idTestKit = +req.params.id
  
  try {
    const testKit = await TestKitService.getDetailTestKitByUserCreated(idTestKit, userId)

    if (!testKit) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        message: 'Test kit not found'
      })
    }

    if (examHasStart(testKit?.dataValues?.startDate)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: 'The exam has started'})
    }

    await TestKitService.deleteTestKit(idTestKit)
    res.json({message: 'Delete success'})
  }
  catch (err) {
    next(err)
  }
})

router.get('/question-to-test/:id', authenticate(), async (req, res, next) => {
  const idTestKit = +req.params.id
  
  try {
    const testKit = await TestKitService.getDetailTestKitById(idTestKit)

    if (!examHasStart(testKit?.dataValues?.startDate)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: 'The exam not started'})
    }
    if (overExamTime(testKit?.dataValues?.startDate, testKit?.dataValues?.duration)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: 'The exam ended'})
    }

    const questions = await QuestionService.getQuestionForTestKit(idTestKit)
    
    res.json({data: questionToTestClient(questions)})
  }
  catch (err) {
    next(err)
  }
})

export default {
  prefix: '/v1/test-kit',
  routerInstance: router
}
