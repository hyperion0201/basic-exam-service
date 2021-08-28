/* eslint-disable camelcase */
/* eslint-disable babel/new-cap */
import express from 'express'
import sendEmail from '../services/email'
import GoogleOAuth2 from '../services/google-auth'
import * as userService from '../services/user'
import {HTTP_STATUS_CODES} from '../utils/constants'
import * as enums from '../utils/constants'
import ServerError from '../utils/custom-error'
import {generateAccessToken} from '../utils/jwt'
import {verifyPasswordSync, generateResetPassword} from '../utils/password'

const router = express.Router()

router.get('/google', (req, res, next) => {
  const googleOAuth2Client = new GoogleOAuth2()
  return res.redirect(googleOAuth2Client.generateLoginUrl())
})

router.get('/google/callback', async (req, res, next) => {
  if (req.query.error) {
    // The user did not give us permission.
    return res.redirect('/')
  }
  else {
    const googleOAuth2Client = new GoogleOAuth2()
    try {
      const tokenResponse = await googleOAuth2Client.getToken(req.query.code)
      googleOAuth2Client.setCredentials(tokenResponse)
      const response = await googleOAuth2Client.getUserInfo()

      const {email, name, verified_email} = response.data

      if (!verified_email) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: 'This email is not verified by Google yet.'
        })
      }

      // since this is a Google sign-in session, the email is verified by Google itself.
      // we don't need to send a verification email.
      let user = await userService.isUserWithEmailExist(email)
      if (!user) {
        user = await userService.createUser({
          email,
          role: enums.USER_ROLES.USER,
          status: enums.USER_STATUS.VERIFIED,
          fullname: name
        })
      }

      // create signed jsonwebtoken and push it back.
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email
      })

      return res.json({
        message: 'Login success.',
        access_token: accessToken
      })
    }
    catch (err) {
      next(new ServerError({
        message: 'Error',
        err
      }))
    }

  }
})

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

  const validPassword = verifyPasswordSync(password, user.password)
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

    res.json(user)
  }
  catch (err) {
    next(err)
  }
})

router.post('/reset-password', async (req, res, next) => {
  const {email} = req.body
  const user = await userService.getUser({
    where: {
      email
    }
  })
  
  if (!user) {
    return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST).send({
      message: 'Email not found.'
    })
  }

  const resetPassword = generateResetPassword()
  try {
    await userService.updatePassword({
      where: {
        id: user.id
      }
    }, resetPassword)

    await sendEmail(
      email,
      '[Basic Exam] - Password reset',
    `Hi.
     We've reset your password.
     Your new password is : ${resetPassword}.
     Please re-login.
     Thanks.
     `
    )

    res.json({
      message: 'Reset password successfully'
    })
  }
  catch (err) {
    next(err)
  }
})

export default {
  prefix: '/v1/auth',
  routerInstance: router
}
