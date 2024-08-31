import { CadastroEnderecoProps } from "../FormEndereco/FormEndereco"
import { CadastroEmailProps, CadastroTelefoneProps } from "../FormTelefoneEmail/FormTelefoneEmail"

export interface CadastraFuncionarioProps {
    "matricula"?: number
    "fkStatus": number | string
    "nome"?: string
    "dataNascimento"?:string
    "cpf"?: string
    "sexo"?: string
    "rg"?: string
    "carteiraTrabalho"?: string
    "nit"?: string
    "pis"?: string
    "tituloEleitor"?: string
    "estadoCivil"?: string
    "reservista"?: string
    "senha"?: string
    "dataAdmissao"?: string
    "fkDepartamento"?: number
    "fkCargo"?:number
    "fkEmpresa"?: number
    "fkNvlAcesso"?: number
    "imagemFuncionario"?:string
    "fkAcesso"?: number
}

export const CadastraFuncionarioPropsClean = (objeto: CadastraFuncionarioProps): CadastraFuncionarioProps => {

    let object2: CadastraFuncionarioProps = objeto

    for (const chave in objeto) {
        //@ts-ignore
        object2[chave] = ''
    }
    return object2
}

export interface CadastraFuncionarioGeralProps {
    "funcionario": CadastraFuncionarioProps | DataUserType | undefined,
    "funcionarioEmail"?: CadastroEmailProps,
    "funcionarioTelefone"?: CadastroTelefoneProps,
    "funcionarioEndereco"?: CadastroEnderecoProps
}

export const CadastraFuncionarioGeralPropsClean = (objeto: CadastraFuncionarioGeralProps): CadastraFuncionarioGeralProps => {

    let object2: CadastraFuncionarioGeralProps = objeto

    for (const chave in objeto) {
        //@ts-ignore
        object2[chave] = ''
    }
    return object2
}