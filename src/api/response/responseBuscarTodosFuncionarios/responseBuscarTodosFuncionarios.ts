import { ConsultaFuncionarioProps } from "@/TypesObjects/FormConsultaFuncionarios/FormConsultaFuncionarios"
import { simularAtraso } from "../responseBuscarPorMatricula/responseBuscarPorMatricula"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_FUNCIONARIO as string

export const BuscarFuncionarioGeral = async ({...rest}:ConsultaFuncionarioProps) => {

    // @ts-ignore
    const params = Object.keys(rest).map((result, index) => index === 0 ? `${result}=${rest[result]}` : `&${result}=${rest[result]}`)

    return simularAtraso().then(() => {
        return fetch(`${url}BuscarFuncionarioGeral?${params.toString().replace(/,/g, '')}`, {
            method: "GET",
            headers: headers(),
            next: {
                revalidate: 1000 * 10
            },
        })
     }).then(results => results.json())
     .then<DataUserType[]>(results => results)
     .catch(err => console.log(err))
}