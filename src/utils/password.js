import bcrypt from 'bcrypt'

const SALT_ROUND = 10

export function hashPasswordSync(password) {
  return bcrypt.hashSync(password, SALT_ROUND)
}

export function verifyPassword(password, hashed) {
  return bcrypt.compareSync(password, hashed)
}
