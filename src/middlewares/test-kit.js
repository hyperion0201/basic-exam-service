import get from 'lodash/get'
import * as TestKitService from '../services/test-kit'
import {HTTP_STATUS_CODES} from '../utils/constants'
import ServerError from '../utils/custom-error'

export function requireTestKitOwner(opts = {}) {
  const {testKitIdPath = 'params.id'} = opts
  return async (req, res, next) => {
    const userId = get(req, 'user.id')
    const idTestKit = Number(get(req, testKitIdPath))

    if (!idTestKit) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
        message: 'Missing testKitId.'
      })
    }

    try {
      const testKit = await TestKitService.getDetailTestKitByUserCreated(idTestKit, userId)
      if (!testKit) {
        return res.status(HTTP_STATUS_CODES.FORBIDDEN).send({
          message: 'Required test kit owner.'
        })
      }
      next()
    }
    catch (err) {
      next(new ServerError({
        name: 'Something error when require test kit owner.',
        err
      }))
    }
  }
}
