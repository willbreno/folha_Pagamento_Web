export interface CadastroEnderecoProps {
    "fkMatricula"?: number,
    "cep"?: string,
    "rua"?: string,
    "numero"?: number,
    "bairro"?: string,
    "cidade"?: string,
    "uf"?: string,
    "complemento"?: string
}

export const CadastroEnderecoClean = (objeto: CadastroEnderecoProps): CadastroEnderecoProps => {

    let object2: CadastroEnderecoProps = objeto

    for (const chave in objeto) {
        //@ts-ignore
        object2[chave] = ''
    }
    return object2
}