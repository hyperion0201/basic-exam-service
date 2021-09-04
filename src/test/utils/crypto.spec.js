/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import cryptoNode from 'crypto'
import { createSandbox } from 'sinon'
import { encrypt, decrypt } from '../../utils/crypto'

describe('Crypto', () => {
  let secret
  let ENCRYPTION_ALGORITHM
  let payload
  let token

  const sanbox = createSandbox()
  beforeEach(() => {
    secret = 'Abc'
    ENCRYPTION_ALGORITHM = 'seed'
    payload = { userName: 'Test' }
    token = 'b754fb8d24c2948912a2a74d230dc162220aa62106e702dc09a39c3bf53f525d'
  })
  afterEach(() => {
    sanbox.restore()
  })

  it('encrypt successfully', () => {
    // eslint-disable-next-line node/no-deprecated-api
    const cipher = cryptoNode.createCipher(ENCRYPTION_ALGORITHM, secret)
    let token = cipher.update(JSON.stringify(payload), 'utf8', 'hex')
    token += cipher.final('hex')
    const result = encrypt(payload, secret)
    expect(result).equal(token)
  })

  it('decrypt error', () => {
    try {
      decrypt('abc', secret)
    }
    catch (error) {
      expect(error).include(new Error('Invalid token'))
    }
  })

  it('decrypt successfully', () => {
    const result = decrypt(token, secret)
    expect(result).include(payload)
  })
})
