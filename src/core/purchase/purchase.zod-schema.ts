import { array, number, object, string } from 'zod'

const purchasedItemSchema = object({
  id: string({ required_error: 'El id del producto es requerido' })
    .min(1, { message: 'El id del producto es requerido' }),
  quantity: number({ required_error: 'La cantidad es requerida' })
    .gt(0, { message: 'La cantidad debe ser mayor a 0' })
    .int({ message: 'La cantidad debe ser un numero natural' })
}).strict({ message: 'Solicitud no válida' })

export const createSchema = object({
  dailySaleId: string({ required_error: 'El id de la caja es necesario' })
    .min(1, { message: 'El id de la caja es necesario' }),
  purchasedItems: array(purchasedItemSchema)
    .nonempty({ message: 'Los productos son requeridos' })
}).strict({ message: 'Solicitud no válida' })
