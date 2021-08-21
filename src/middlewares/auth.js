import jwt from 'jsonwebtoken'
import get from 'lodash/get'
import {JWT_SECRET} from '../configs'

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

export async function authenticate(options = {}) {
  return async (req, res, next) => {
    const token = extractTokenFromRequest(req)
    try {
      const user = await verifyToken(token)
      req.user = user
      next()
    }
    catch (err) {
      next(err)
    }
  }
}
