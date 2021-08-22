import {HTTP_STATUS_CODES} from '../utils/constants'

export function errorHandler(err, req, res, next) {
  err.logDetail({omitStackTrace: false})
  res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
}
