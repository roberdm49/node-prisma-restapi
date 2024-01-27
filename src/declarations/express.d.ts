declare namespace Express {
  interface Request {
    user: {
      id: string
      username: string
      tenantId: string
    }
  }
}
