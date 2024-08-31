import { MutableRefObject } from "react"
import { message } from "./message"

export const showErase = (toast:MutableRefObject<null>) => {
    message({toast,detail:'Apagados com sucesso',severity:'success',summary:'Sucesso'})
}