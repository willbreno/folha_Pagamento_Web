import { MutableRefObject } from "react"
import { message } from "./message"

export const showErroOperacao = (toast:MutableRefObject<null>) => {
    message({toast,detail:'Aconteceu um Erro',severity:'error',summary:'Falha na operação'})
}

export const showErroOperacaoEnvio = (toast:MutableRefObject<null>) => {
    message({toast,detail:'Aconteceu um Erro ao Enviar os Dados',severity:'error',summary:'Falha na operação'})
}

export const showErroOperacaoReceberDados = (toast:MutableRefObject<null>) => {
    message({toast,detail:'Aconteceu um Erro ao Receber os Dados',severity:'error',summary:'Falha na operação'})
}

export const showErroOperacaoDadosIncompletos = (toast:MutableRefObject<null>) => {
    message({toast,detail:'Preencha os campos obrigatórios',severity:'error',summary:'Falha na operação'})
}