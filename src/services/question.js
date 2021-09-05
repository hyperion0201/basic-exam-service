import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import db from '../core/db'
import ServerError from '../utils/custom-error'

export async function getQuestionForTestKit(id) {
  try {
    return await db.Question.findAll({where: {testKitId: id}})
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get all question for test kit.',
      err
    })
  }
}

export async function getDetailQuestion(id, opts = {}) {
  const {raw = false} = opts
  try {
    return await db.Question.findOne({where: {id}}, raw)
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get all question for test kit.',
      err
    })
  }
}

export async function createQuestion(payload = {}) {
  try {
    return await db.Question.create({
      ...payload
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when create question.',
      err
    })
  }
}

export async function updateQuestion(payload = {}, idQuestion, idTestKit) {
  try {
    return await db.Question.update({
      ...payload
    }, {
      where: {id: idQuestion, testKitId: idTestKit}
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when update question.',
      err
    })
  }
}

export async function deleteQuestion(idQuestion) {
  try {
    return await db.Question.destroy({
      where: {id: idQuestion}
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when delete question.',
      err
    })
  }
}

export async function getAnswerResult(questionId, answer = []) {

  const question = await getDetailQuestion(questionId, {raw: true})
  const questionChoices = JSON.parse(get(question, 'choices', []))

  let correctAnswer = questionChoices.map((choice, index) => {
    return get(choice, 'is_correct') === true ? index : null
  })
  correctAnswer = correctAnswer.filter(item => item !== null)
  const isCorrect = isEqual(correctAnswer, answer)

  return {
    isCorrect,
    score: isCorrect ? get(question, 'score', 0) : 0
  }
}
