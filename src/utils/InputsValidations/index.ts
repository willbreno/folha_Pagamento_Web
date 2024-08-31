import * as z from "zod"

export interface ValidationResultZod<T> {
  success: boolean
  data?: T
  error?: z.ZodError
}

const dateSchema = z.date().refine(value => {
  const age = (new Date().getTime() - new Date(value).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  return age >= 18
}, { message: "A data deve representar uma idade maior ou igual a 18 anos." })

const cpfSchema = z.string().refine(value => value.length == 11, {
     message: "CPF deve ter 11 dígitos." 
    })
const cepSchema = z.string().refine(value => value.length == 8, {
     message: "O CEP deve ter 8 dígitos." 
    })
const rgSchema = z.string().refine(value => value.length == 9, {
     message: "RG deve ter 10 dígitos." 
    })
const phoneSchema = z.string().refine(value => value.length == 10, {
     message: "telefone deve ter 10 dígitos." 
    })
const ctpsSchema = z.string().refine(value => value.length == 13, {
     message: "A carteira de trabalho deve ter 12 dígitos." 
    })
const pisSchema = z.string().refine(value => value.length == 11, {
     message: " O PIS deve ter 11 dígitos." 
    })
const dateAdmissionSchema = z.date().refine(value => {

})
const defaultSchema = z.string().refine(value => value.length > 3, {
    message: " Deve ter pelo menos 3 dígitos." 
   })

export const validateDate = (value: string): ValidationResultZod<Date> => {
  try {
    const data = dateSchema.parse(value)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as z.ZodError}
  }

}

export const validateCpf = (value: string): ValidationResultZod<string> => {
  try {
    const data = cpfSchema.parse(value)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as z.ZodError }
  }
}

export const validateRg = (value: string): ValidationResultZod<string> => {
  try {
    const data = rgSchema.parse(value)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as z.ZodError }
  }

}

export const validatePhone = (value: string): ValidationResultZod<string> => {
  try {
    const data = phoneSchema.parse(value)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as z.ZodError }
  }

}
export const validateCtps = (value: string): ValidationResultZod<string> => {
  try {
    const data = ctpsSchema.parse(value)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as z.ZodError }
  }

}
export const validatePis = (value: string): ValidationResultZod<string> => {
  try {
    const data = pisSchema.parse(value)
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as z.ZodError }
  }
}

export const validateDateAdmission = (value: string): ValidationResultZod<Date> => {
    try {
      const data = dateAdmissionSchema.parse(value)
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error as z.ZodError}
    }
}

export const validateCep = (value: string): ValidationResultZod<String> => {
    try {
        const data = cepSchema.parse(value)
        return { success: true, data }
      } catch (error) {
        return { success: false, error: error as z.ZodError }
      }
}

export const validateDefault = (value: string): ValidationResultZod<String> => {
     try {
        const data = defaultSchema.parse(value)
            return { success: true, data }
          } catch (error) {
            return { success: false, error: error as z.ZodError }
          }
}
