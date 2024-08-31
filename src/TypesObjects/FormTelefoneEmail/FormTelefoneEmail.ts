export interface CadastroEmailProps {
    "fkMatricula"?: number,
    "email"?: string
}

export interface CadastroTelefoneProps {
    "fkMatricula"?: number,
    "telefone"?: string
}

export const CadastroEmailClean = (objeto: CadastroEmailProps): CadastroEmailProps => {

    let object2: CadastroEmailProps = objeto
    for (const chave in objeto) {
        //@ts-ignore
        object2[chave] = ''
    }
    return object2
}

export const CadastroTelefoneClean = (objeto: CadastroTelefoneProps): CadastroTelefoneProps => {

    let object2: CadastroTelefoneProps = objeto
    for (const chave in objeto) {
        //@ts-ignore
        object2[chave] = ''
    }
    return object2
}