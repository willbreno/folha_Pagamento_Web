import { DataCargoType } from "@/TypesObjects/DataCargoType/DataCargoType"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_CARGO as string


export const BuscarTodosCargos = async (idDepartamento?: number) => {

    const url_ = idDepartamento ? `${url}BuscarCargoGeral?FkDepartamento=${idDepartamento}` : `${url}BuscarCargoGeral`
    try {
        const response = await fetch(url_, {
            method: "GET",
            headers: headers(),
            next: {
                revalidate: 1000 * 10
            },
        })
        const results = await response.json()
        const result: DataCargoType[] = results
        return result
    } catch (err) {
        return []
    }
}