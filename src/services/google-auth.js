import {
  SERVER_PORT, JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} from '../configs'

const baseUrl = `localhost:${SERVER_PORT}`

export const googleOAuth2Config = {
  JWTsecret: JWT_SECRET,
  baseURL: baseUrl,
  port: SERVER_PORT,
  oauth2Credentials: {
    client_id: GOOGLE_CLIENT_ID,
    project_id: 'basic-exam-service-auth',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uris: [
      `${baseUrl}/auth_callback`
    ],
    scopes: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  }

}
