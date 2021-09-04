/* eslint-disable babel/new-cap */
import express from 'express'
import get from 'lodash/get'
import { authenticate } from '../middlewares/auth'
import * as FormContact from '../services/form-contact'
import { HTTP_STATUS_CODES } from '../utils/constants'

const router = express.Router()

router.get('/', authenticate({ requiredAdmin: true }), async (req, res, next) => {
  try {
    const formContacts = await FormContact.getFormContact()
    res.json(formContacts)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', authenticate({ requiredAdmin: true }), async (req, res, next) => {
  const idFormContract = +req.params.id
  try {
    const formContact = await FormContact.getDetailFormContact(idFormContract)

    if (!formContact) return res.status(HTTP_STATUS_CODES.NOT_FOUND).end()

    res.json(formContact)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const payload = req.body

  try {
    const formContact = await FormContact.createFormContact(payload)
    res.json(formContact)
  }
  catch (err) {
    next(err)
  }
})

router.patch('/mark-done/:id', authenticate({ requiredAdmin: true }), async (req, res, next) => {
  const idFormContract = +get(req, 'params.id')
  try {
    await FormContact.updateMarkDone(idFormContract)
    res.json({ message: 'mark done' })
  }
  catch (err) {
    next(err)
  }
})

export default {
  prefix: '/v1/form-contract',
  routerInstance: router
}
