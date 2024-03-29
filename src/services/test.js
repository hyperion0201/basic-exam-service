import get from 'lodash/get'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import db from '../core/db'
import ServerError from '../utils/custom-error'

export async function getAllTestsByAdmin() {
  try {
    return await db.Test.findAll()
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get all test by admin',
      err
    })
  }
}

export async function getTestsById(id) {
  try {
    return await db.Test.findOne({where: {id}})
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get test by id.',
      err
    })
  }
}

export async function getTestsByIdUser(id) {
  try {
    return await db.Test.findAll({where: {userId: id}})
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get test by user id.',
      err
    })
  }
}

export async function getTestsByIdTestKit(id) {
  
  try {
    const tests = await db.Test.findAll({
      where: {testKitId: id},
      raw: false,
      include: [{
        model: db.User
      }]
    })

    return tests.map(test => {
      const rawTests = test.toJSON()
      const user = pick(test.User, 'email')
      return {...rawTests, User: user}
    })
  
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get test by user id.',
      err
    })
  }
}

export async function createTest(payload = {}) {
  try {
    return await db.Test.create({
      ...payload
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when create test.',
      err
    })
  }
}

export async function updateTest(payload = {}, opts = {}) {
  try {
    return await db.Test.update({
      ...payload
    }, {
      ...opts
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when update test.',
      err
    })
  }
}

export async function getTestHistoryDetail(testId) {
  const userAnswers = await db.UserAnswer.findAll({
    where: {testId},
    raw: false,
    include: [{
      model: db.Question
    }]
  })

  return userAnswers.map(answer => {
    const rawAnswer = answer.toJSON()
    const originQuestionChoices = JSON.parse(get(rawAnswer, 'Question.choices', []))
    const choicesOnly = originQuestionChoices.map(question => omit(question, ['is_correct']))
    return {
      ...rawAnswer,
      Question: {
        ...rawAnswer.Question,
        choices: choicesOnly
      }
    }
  })
}
