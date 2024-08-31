import { MutableRefObject } from "react"
import { message } from "./message"

export const showSuccess = (toast:MutableRefObject<null>) => {
    message({toast,detail:'Operação realizada com sucesso',severity:'success',summary:'Sucesso'})
}