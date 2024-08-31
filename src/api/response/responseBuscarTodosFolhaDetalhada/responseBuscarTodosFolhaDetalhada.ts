import { DataFolhaDetalhadaType } from "@/TypesObjects/DataFolhaDetalhadaType/DataFolhaDetalhadaType"
import { simularAtraso } from "../responseBuscarPorMatricula/responseBuscarPorMatricula"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_FOLHA_DETALHADA as string

export const BuscarFolhaDetalhadaGeral = async ({...rest}:DataFolhaDetalhadaType) => {

    // @ts-ignore
    const params = Object.keys(rest).map((result, index) => index === 0 ? `${result}=${rest[result]}` : `&${result}=${rest[result]}`)

    return simularAtraso().then(() => {
        return fetch(`${url}RelatorioFuncionario?${params.toString().replace(/,/g, '')}`, {
            method: "GET",
            headers: headers(),
            next: {
                revalidate: 1000 * 10
            },
        })
        
     }).then(results => results.json())
     .then<DataFolhaDetalhadaType[]>(results => results)
     .catch(err => console.log(err))
}