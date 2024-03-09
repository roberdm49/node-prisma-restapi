import { object, string } from 'zod'

export const signUpSchema = object({
  tenantName: string({ required_error: 'El nombre del comercio es requerido' })
    .min(1, { message: 'El nombre del comercio es requerido' }),
  firstname: string({ required_error: 'El primer nombre es requerido' })
    .min(1, { message: 'El primer nombre es requerido' }),
  lastname: string({ required_error: 'El apellido es requerido' })
    .min(1, { message: 'El apellido es requerido' }),
  username: string({ required_error: 'El nombre de usuario es requerido' })
    .min(1, { message: 'El nombre de usuario es requerido' }),
  password: string({ required_error: 'La contraseña es requerida' })
    .min(1, { message: 'La contraseña es requerida' })
}).strict({ message: 'Solicitud no válida' })

export const logInSchema = object({
  username: string({ required_error: 'El nombre de usuario es requerido' })
    .min(1, { message: 'El nombre de usuario es requerido' }),
  password: string({ required_error: 'La contraseña es requerida' })
    .min(1, { message: 'La contraseña es requerida' })
}).strict({ message: 'Solicitud no válida' })
