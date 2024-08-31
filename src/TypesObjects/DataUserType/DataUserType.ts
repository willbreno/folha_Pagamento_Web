
interface DataUserType {
    matricula: number,
    cpf: string,
    nome: string,
    dataNascimento: string,
    sexo: string,
    rg: string,
    carteiraTrabalho: string,
    nit: string,
    pis: string,
    tituloEleitor: string,
    estadoCivil: string,
    reservista: string,
    senha: string,
    dataAdmissao: string,
    fkDepartamento: number,
    fkCargo: number,
    fkEmpresa: number,
    fkNvlAcesso: number,
    imagemFuncionario?:string,
    fkStatus: number,
    fkAcesso: number
}


interface DataUserTypeWithStatus {
    status: number
    funcionarios: DataUserType[]|undefined
}