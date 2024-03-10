import { array, number, object, optional, string } from 'zod'

// create
// getAll
// updateMany
// deleteMany

const productEntrySchema = object({
  name: string({ required_error: 'El nombre es requerido' })
    .min(1, { message: 'El nombre es requerido' }),
  valueInUsd: number({ required_error: 'El precio es requerido' })
    .gt(0, { message: 'El precio debe ser mayor a 0' }),
  currencyId: number({ required_error: 'El currencyId es requerido' }),
  description: optional(string().min(1, { message: 'La descripción es opcional pero no puede ser una cadena vacía' })),
  stock: optional(number().gte(0, { message: 'El stock es opcional pero de enviarse debe ser mayor o igual a 0' })),
  // TODO: check logic related with optional barCode
  barCode: optional(string().min(1, { message: 'El código de barra es opcional pero no puede ser una cadena vacía' })),
  companyId: optional(string().min(1, { message: 'El companyId es opcional pero no puede ser una cadena vacía' }))
})

export const createSchema = array(productEntrySchema)
