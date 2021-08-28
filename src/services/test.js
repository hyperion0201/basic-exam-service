import db from '../core/db'
import ServerError from '../utils/custom-error'

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
    return await db.Test.findAll({where: {testKitId: id}})
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
      name: 'Something error when update test.',
      err
    })
  }
}

export async function updateTest(payload = {}, idQuestion) {
  try {
    return await db.Test.update({
      ...payload
    }, {
      where: {id: idQuestion}
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when update test.',
      err
    })
  }
}
