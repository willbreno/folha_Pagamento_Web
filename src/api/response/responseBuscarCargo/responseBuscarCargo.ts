import { DataCargoType } from "@/TypesObjects/DataCargoType/DataCargoType"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_CARGO as string

export const BuscarCargo = async (idCargo?:number) => {

    if(idCargo !== -1){

        try {
            const response = await fetch(`${url}BuscarFuncionarioCargo?IdCargo=${idCargo}`, {
                method: "GET",
                headers: headers(),
                next: {
                    revalidate: 1000 * 10
                },

            })
            const results = await response.json()
            const result: DataCargoType = results
            return result
        } catch (err) {
            
        }
    }
}