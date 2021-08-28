import db from '../core/db'
import ServerError from '../utils/custom-error'

export async function createTestKit(payload = {}) {
  try {
    return await db.TestKit.create({
      ...payload
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when create test kit.',
      err
    })
  }
}

export async function updateTestKit(payload = {}, id) {
  try {
    return await db.TestKit.update({
      ...payload
    }, {
      where: {id}
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when update test kit.',
      err
    })
  }
}

export async function getTestKit(id) {
  try {
    return await db.TestKit.findAll({where: {createdBy: id}})
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get all test kit.',
      err
    })
  }
}

export async function getDetailTestKitById(idTestKit) {
  try {
    return await db.TestKit.findOne({where: {id: idTestKit}})
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get detail test kit by id.',
      err
    })
  }
}

export async function getDetailTestKitByUserCreated(idTestKit, idUserCreate) {
  try {
    return await db.TestKit.findOne({where: {id: idTestKit, createdBy: idUserCreate}})
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get detail test kit by id and user created.',
      err
    })
  }
}

export async function deleteTestKit(idTestKit) {
  try {
    return await db.TestKit.destroy({where: {id: idTestKit}})
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get delete test kit.',
      err
    })
  }
}
