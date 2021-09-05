import db from '../core/db'
import ServerError from '../utils/custom-error'

export async function createUserAnswer(payload = {}) {
  try {
    return await db.UserAnswer.create({
      ...payload
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when create new user answer.',
      err
    })
  }
}

export async function getUserAnswersByUser(userId) {
  try {
    return await db.UserAnswer.findAll({
      where: {userId},
      raw: true
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something err when get all user answers',
      err
    })
  }
}
