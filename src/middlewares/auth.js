import jwt from 'jsonwebtoken'
import get from 'lodash/get'
import {JWT_SECRET} from '../configs'
import {HTTP_STATUS_CODES} from '../utils/constants'
import ServerError from '../utils/custom-error'

function extractTokenFromRequest(req) {
  const authHeader = get(req, 'headers.authorization')
  return authHeader && authHeader.split(' ')[1]
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) reject(err)
      resolve(user)
    })
  })

}

export function authenticate(options = {}) {
  return async (req, res, next) => {
    const token = extractTokenFromRequest(req)

    if (!token) {
      return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED).send({
        message: 'Unauthorized.'
      })
    }
    
    try {
      const user = await verifyToken(token)
      req.user = user
      return next()
    }
    catch (err) {
      throw new ServerError({
        name: 'Something error when authenticate.',
        err
      })
    }
  }
}
