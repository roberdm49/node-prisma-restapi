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
  description: string().min(1, { message: 'La descripción es opcional pero no puede ser una cadena vacía' }).optional(),
  stock: number().gte(0, { message: 'El stock es opcional pero de enviarse debe ser mayor o igual a 0' }).optional(),
  // TODO: check logic related with optional barCode
  barCode: string().min(1, { message: 'El código de barra es opcional pero no puede ser una cadena vacía' }).optional(),
  companyId: string().min(1, { message: 'El companyId es opcional pero no puede ser una cadena vacía' }).optional()
}).strict({ message: 'Solicitud no válida' })

export const createSchema = array(productEntrySchema).nonempty({ message: 'Debe enviarse al menos 1 elemento' })

const productUpdateSchema = object({
  id: string({ required_error: 'El id es requerido' }).min(1, { message: 'El id es requerido' }),
  name: string().min(1, { message: 'El nombre es opcional pero no puede ser una cadena vacía' }).optional(),
  price: number().gt(0, { message: 'El precio es opcional pero debe ser mayor a 0' }).optional(),
  currencyId: number().min(1, { message: 'El currencyId es opcional pero debe ser un valor válido' }).optional(),
  description: string().min(1, { message: 'La descripción es opcional pero no puede ser una cadena vacía' }).optional(),
  stock: number().min(1, { message: 'El stock es opcional pero debe ser un valor mayor o igual a 0' }).optional(),
  barCode: string().min(1, { message: 'El código de barras es opcional pero no puede ser una cadena vacía' }).optional(),
  companyId: string().min(1, { message: 'El companyId es opcional pero no puede ser una cadena vacía' }).optional()
}).strict({ message: 'Solicitud no válida' })

export const updateSchema = array(productUpdateSchema).nonempty({ message: 'Debe enviarse al menos 1 elemento' })

export const deleteSchema = array(string().min(1, { message: 'El id es requerido' })).nonempty({ message: 'Debe enviarse al menos 1 elemento' })
