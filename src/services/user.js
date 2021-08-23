import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import db from '../core/db'
import * as enums from '../utils/constants'
import ServerError from '../utils/custom-error'
import {hashPasswordSync} from '../utils/password'

export async function createUser(payload = {}) {
  const {password} = payload

  try {
    const hashed = hashPasswordSync(password)
    return await db.User.create({
      ...payload,
      password: hashed,
      role: enums.USER_ROLES.USER,
      status: enums.USER_STATUS.NOT_VERIFIED
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when create user.',
      err
    })
  }
}

export async function getUser(opts = {}) {
  const queryObj = {
    ...opts
  }

  try {
    return await db.User.findOne(queryObj)
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when find user.', err
    })
  }
}

export async function isUserWithEmailExist(userEmail) {
  try {
    return await db.User.findOne({
      where: {
        email: userEmail
      }
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when check user exists.',
      err
    })
  }
}

export async function getAllUsers(opts = {}) {
  const queryObj = {
    ...opts
  }

  try {
    return await db.User.findAll(queryObj)
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get all users.',
      err
    })
  }
}

export async function updateUser(opts = {}, payload) {
  delete payload.password
  const queryObj = {
    ...opts
  }

  try {
    return await db.User.update(payload, queryObj)
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when update user.',
      err
    })
  }
}

export async function deleteUser(opts = {}) {
  const queryObj = {
    ...opts
  }

  try {
    return await db.User.destroy(queryObj)
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when delete user.', err
    })
  }
}

export async function updatePassword(opts = {}, newPassword) {
  // hash password
  const hashed = hashPasswordSync(newPassword)
  const queryObj = {
    ...opts
  }

  try {
    return await db.User.update({
      password: hashed
    }, queryObj)
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when update password.',
      err
    })
  }
}

export async function isAdmin(userOrId) {
  let userObj = userOrId
  if (isNumber(userOrId)) {
    userObj = await getUser({
      where: {
        id: userOrId
      }
    })
  }

  return get(userObj, 'role') === enums.USER_ROLES.ADMIN
}
