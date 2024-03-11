import { array, number, object, string } from 'zod'

// create
// getAll
// updateMany
// deleteMany

const productEntrySchema = object({
  name: string({ required_error: 'El nombre es requerido' })
    .min(1, { message: 'El nombre es requerido' }),
  price: number({ required_error: 'El precio es requerido' })
    .gt(0, { message: 'El precio debe ser mayor a 0' }),
  currencyId: number({ required_error: 'El currencyId es requerido' }),
  description: string().min(1, { message: 'La descripción es opcional pero no puede ser una cadena vacía' }).nullable(),
  stock: number().gte(0, { message: 'El stock es opcional pero de enviarse debe ser mayor o igual a 0' }).nullable(),
  // TODO: check logic related with optional barCode
  barCode: string().min(1, { message: 'El código de barra es opcional pero no puede ser una cadena vacía' }).nullable(),
  companyId: string().min(1, { message: 'El companyId es opcional pero no puede ser una cadena vacía' }).nullable()
}).strict({ message: 'Solicitud no válida' })

export const createSchema = array(productEntrySchema)

export const updateSchema = object({
  name: string().min(1, { message: 'El nombre es opcional pero no puede ser una cadena vacía' }).nullable(),
  price: number().gt(0, { message: 'El precio es opcional pero debe ser mayor a 0' }).nullable(),
  currencyId: number().min(1, { message: 'El currencyId es opcional pero debe ser un valor válido' }).nullable(),
  description: string().min(1, { message: 'La descripción es opcional pero no puede ser una cadena vacía' }).nullable(),
  stock: number().min(1, { message: 'El stock es opcional pero debe ser un valor mayor o igual a 0' }).nullable(),
  barCode: string().min(1, { message: 'El código de barras es opcional pero no puede ser una cadena vacía' }).nullable(),
  companyId: string().min(1, { message: 'El companyId es opcional pero no puede ser una cadena vacía' }).nullable()
})
