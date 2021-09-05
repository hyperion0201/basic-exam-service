/* eslint-disable babel/new-cap */
import BPromise from 'bluebird'
import express from 'express'
import get from 'lodash/get'
import {authenticate} from '../middlewares/auth'
import * as questionService from '../services/question'
import * as testService from '../services/test'
import * as userAnswerService from '../services/user-answer'
import * as enums from '../utils/constants'

const router = express.Router()

router.post('/', authenticate(), async (req, res, next) => {
  const userId = get(req, 'user.id')
  const body = get(req, 'body', {})
  const {studentId = null, fullName = null, recorded = [], testKitId = null} = body

  try {
    let totalScore = 0
    const test = await testService.createTest({
      userId,
      testKitId,
      status: enums.TEST_STATUS.COMPLETED,
      extraInfo: {
        studentId,
        fullName
      },
      totalScore
    })

    const testId = get(test, 'id')

    await BPromise.map(recorded, async ({questionId, answer = []}) => {
      const answerResult = await questionService.getAnswerResult(questionId, answer)
      totalScore += answerResult.score
      // store user answer for history
      await userAnswerService.createUserAnswer({
        userId,
        questionId,
        answer,
        testId
      })
    })

    // update test score
    await testService.updateTest({totalScore}, {
      where: {
        id: testId
      }
    })

    return res.json({
      message: 'You have submitted your test.'
    })
  }
  catch (err) {
    next(err)
  }
})

export default {
  prefix: '/v1/submit-test',
  routerInstance: router
}
