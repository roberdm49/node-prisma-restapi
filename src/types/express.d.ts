import { AccessTokenPayload } from './access-token'

declare global {
  namespace Express {
    interface Request {
      user: AccessTokenPayload
    }
  }
}
