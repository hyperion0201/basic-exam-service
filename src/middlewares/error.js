import debug from 'debug'
const ns = 'server-error'

export function errorHandler(err, req, res, next) {
  debug.log(ns, 'Something err : ', err.message)
  res.sendStatus(500)
}
