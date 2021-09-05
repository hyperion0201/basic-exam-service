import axios from 'axios'
import {expect} from 'chai'
import {createSandbox} from 'sinon'
import * as authRouter from '../../controllers/auth'
import * as userService from '../../services/user'
import * as jwt from '../../utils/jwt'
import * as syncPassword from '../../utils/password'
import apiMock from '../mockApi'

describe('Auth controller', () => {
  const PORT = '3333'
  // eslint-disable-next-line import/namespace
  const url = `http://localhost:${PORT}/v1/auth`
  let server
  const sanbox = createSandbox()
  let user
  before(done => {
    server = apiMock(authRouter, PORT)
    user = {id: 1, email: 'test@gmail.com', password: '1234', role: 'Admin'}
    done()
  })

  afterEach(() => {
    sanbox.restore()
  })

  after(done => server.close(done))

  it('Login with not exist user', async () => {
    sanbox.stub(userService, 'getUser').resolves(undefined)
    const result = await axios.post(`${url}/login`).catch(error => error.response)
    expect(result.status).equal(400)
    expect(result.data.message).equal('Invalid username/password.')
  })

  it('Login with invalid password', async () => {
    sanbox.stub(userService, 'getUser').resolves(user)
    const result = await axios.post(`${url}/login`).catch(error => error.response)
    expect(result.status).equal(400)
    expect(result.data.message).equal('Invalid username/password.')
  })

  it('Login successfully', async () => {
    sanbox.stub(userService, 'getUser').resolves(user)
    sanbox.stub(syncPassword, 'verifyPasswordSync').resolves(true)
    sanbox.stub(jwt, 'generateAccessToken').returns('Token')
    const result = await axios.post(`${url}/login`)
    const data = {message: 'Login success.', access_token: 'Token', role: user.role}
    expect(result.data).include(data)
  })
})
