/* eslint-disable babel/new-cap */
import express from 'express'
import * as userService from '../services/user'
import {HTTP_STATUS_CODES} from '../utils/constants'
import {generateAccessToken} from '../utils/jwt'
import {verifyPassword} from '../utils/password'

const router = express.Router()

router.post('/login', async (req, res, next) => {
  const {email, password} = req.body
  const user = await userService.getUser({
    where: {
      email
    }
  })

  if (!user) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
      message: 'Invalid username/password.'
    })
  }

  // verify password
  const validPassword = verifyPassword(password, user.password)
  if (!validPassword) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
      message: 'Invalid username/password.'
    })
  }

  // to-do: account is not verified

  const token = generateAccessToken({
    id: user.id,
    email: user.email
  })

  res.json({
    message: 'Login success.',
    access_token: token
  })
})

router.post('/register', async (req, res, next) => {
  const payload = req.body
  try {
    const user = await userService.createUser(payload)

    // to-do: email verification
    res.json(user)
  }
  catch (err) {
    next(err)
  }

})

export default {
  prefix: '/v1/auth',
  routerInstance: router
}
