import { DataDepartamentoType } from "@/TypesObjects/DataDepartamentoType/DataDepartamentoType"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_DEPARTAMENTO as string


export const BuscarDepartamento = async (idDepartamento?: number) => {

    const url_ =`${url}BuscarDepartamentoFuncionario?IdDepartamento=${idDepartamento}`
    try {
        const response = await fetch(url_, {
            method: "GET",
            headers: headers(),
            next: {
                revalidate: 1000 * 10
            },
        })
        const results = await response.json()
        const result: DataDepartamentoType = results
        return result
    } catch (err) {
        
    }
}