import { object, string } from 'zod'

export const createSchema = object({
  name: string({ required_error: 'El nombre es requerido' })
    .min(1, { message: 'El nombre es requerido' })
}).strict({ message: 'Solicitud no válida' })
