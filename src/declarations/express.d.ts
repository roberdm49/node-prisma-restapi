// express.d.ts

declare namespace Express {
  interface Request {
    // TODO: change it for the real type (custom)
    user?: any
  }
}
