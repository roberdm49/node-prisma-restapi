import { object, array, string, number } from 'zod'

export const currencyEntrySchema = object({
  name: string({ required_error: 'El nombre es requerido' })
    .min(1, { message: 'El nombre es requerido' }),
  isoCode: string({ required_error: 'El codigo ISO es requerido' })
    .min(1, { message: 'El codigo ISO es requerido' }),
  isoNum: string({ required_error: 'El numero ISO es requerido' })
    .min(1, { message: 'El numero ISO es requerido' }),
  valueInUsd: number({ required_error: 'El valor en usd es requerido' })
    .gt(0, { message: 'El valor en usd debe ser mayor a 0' })
}).strict({ message: 'Solicitud no válida' })

export const createNewCurrencyHistoriesAndUpdateCurrenciesTargetSchema = array(currencyEntrySchema).nonempty({ message: 'Debe enviarse al menos 1 elemento' })
