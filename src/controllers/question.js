/* eslint-disable babel/new-cap */
import express from 'express'
import get from 'lodash/get'
import {authenticate} from '../middlewares/auth'
import * as QuestionService from '../services/question'
import * as TestKitService from '../services/test-kit'
import {HTTP_STATUS_CODES} from '../utils/constants'
import {examHasStart} from '../utils/date'

const router = express.Router()

router.get('/:idTestKit', authenticate(), async (req, res, next) => {
  const userId = get(req, 'user.id')
  const TestKitId = +req.params.idTestKit

  try {
    const testKits = await TestKitService.getDetailTestKitByUserCreated(TestKitId, userId)

    if (!testKits) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        message: 'Test kit not found'
      })
    }

    const questionsRaw = await QuestionService.getQuestionForTestKit(TestKitId)
    if (questionsRaw.length === 0) return res.json({data: questionsRaw})

    const questions = questionsRaw.map((item) => {
      const data = get(item, 'dataValues')
      return {...data, choices: JSON.parse(data.choices)}
    })

    res.json({data: questions})
  }
  catch (err) {
    next(err)
  }
})

router.post('/', authenticate(), async (req, res, next) => {
  const questions = get(req, 'body')
  questions.choices = JSON.stringify(questions.choices)
  
  try {
    const testKit = await TestKitService.getDetailTestKitById(questions.testKitId)

    if (examHasStart(testKit?.dataValues?.startDate)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: 'The exam has started'})
    }

    await QuestionService.createQuestion(questions)
    res.json({message: `Create question to test kit has id ${questions.testKitId} success`})
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', authenticate(), async (req, res, next) => {
  const idQuestion = +req.params.id
  const questionsUpdate = get(req, 'body')
  delete questionsUpdate.id
  questionsUpdate.choices = JSON.stringify(questionsUpdate.choices)

  try {
    const testKit = await TestKitService.getDetailTestKitById(questionsUpdate.testKitId)

    if (examHasStart(testKit?.dataValues?.startDate)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: 'The exam has started'})
    }

    await QuestionService.updateQuestion(questionsUpdate, idQuestion, questionsUpdate.testKitId)

    res.json({
      message: `Update question id ${idQuestion} success`
    })
  }
  catch (err) {
    next(err)
  }
})

router.delete('/:id', authenticate(), async (req, res, next) => {
  const idQuestion = +req.params.id
  const userId = +get(req, 'user.id')
  const idTestKit = +get(req, 'body.testKitId')

  try {
    const testKit = await TestKitService.getDetailTestKitByUserCreated(idTestKit, userId)
    const question = await QuestionService.getDetailQuestion(idQuestion)

    if (!question.testKitId) {
      await QuestionService.deleteQuestion(idQuestion)
      return res.json({message: `Delete question id ${idQuestion} success`})
    }

    if (!testKit || !question || !question.testKitId || question.testKitId !== idTestKit) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({message: 'Question not found'})
    }

    await QuestionService.deleteQuestion(idQuestion)

    res.json({message: `Delete question id ${idQuestion} success`})
  }
  catch (err) {
    next(err)
  }
})

export default {
  prefix: '/v1/questions',
  routerInstance: router
}
