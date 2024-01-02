export enum ErrorNames {
  Unauthorized = 'unauthorized',
  WrongCredentials = 'wrong-credentials',
  MissingCredentials = 'missing-credentials'
}

export enum ErrorServerMessages {
  RefreshTokenNotProvided = 'Refresh token not provided',
  WrongCredentials = 'Wrong credentials',
  MissingCredentials = 'Missing credentials'
}

export enum ErrorClientMessages {
  RefreshTokenNotProvided = 'No se ha proporcionado el refresh token',
  WrongCredentials = 'Credenciales inválidas',
  MissingCredentials = 'Credenciales incompletas'
}
