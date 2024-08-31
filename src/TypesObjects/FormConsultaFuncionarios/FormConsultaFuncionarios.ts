export interface ConsultaFuncionarioProps {
    "fkStatus":number|string
    "matricula"?: number
    "cpf"?:string
    "sexo"?:string
    "rg"?:string
    "nome"?:string
    "FkCargo"?:number
    "FkDepartamento"?:number
    "FkNvlAcesso"?:number
}

export const ConsultaFuncionarioPropsClean = (objeto:ConsultaFuncionarioProps):ConsultaFuncionarioProps => {

    let object2:ConsultaFuncionarioProps = objeto

    for(const chave in objeto){
        //@ts-ignore
        object2[chave] = ''
    }
    return object2
}