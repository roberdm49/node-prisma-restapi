export enum ErrorNames {
  BadRequest = 'bad-request',
  Conflict = 'conflict',
  RefreshToken = 'refresh-token',
  Unauthorized = 'unauthorized',
  WrongCredentials = 'wrong-credentials'
}

export enum ErrorClientMessages {
  BadRequest = 'Solicitud incorrecta',
  RefreshTokenNotProvided = 'No se ha proporcionado el refresh token',
  WrongCredentials = 'Credenciales inválidas'
}
