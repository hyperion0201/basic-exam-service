import db from '../core/db'
import ServerError from '../utils/custom-error'

export async function createFormContact(payload = {}) {
  try {
    return await db.FormContact.create({
      ...payload
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when create form contract..',
      err
    })
  }
}

export async function getDetailFormContact(id) {
  try {
    return await db.FormContact.findOne({ where: { id } })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get detail form contract..',
      err
    })
  }
}

export async function getFormContact() {
  try {
    return await db.FormContact.findAll()
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get all form contract..',
      err
    })
  }
}

export async function updateMarkDone(id) {
  try {
    return await db.FormContact.update({
      markDone: true
    }, {
      where: { id }
    })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get all form contract..',
      err
    })
  }
}

export async function deleteFormContact(id) {
  try {
    return await db.FormContact.destroy({ where: { id } })
  }
  catch (err) {
    throw new ServerError({
      name: 'Something error when get delete form contract.',
      err
    })
  }
}
