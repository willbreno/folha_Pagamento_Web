import { DataIRRFType } from "@/TypesObjects/DataIRRFType/DataIRRFType"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_IRRF as string
export const BuscarTodosIRRF = async () => {
    try {
        const response = await fetch(`${url}`, {
            method: "GET",
            headers: headers(),
            next: {
                revalidate: 1000 * 10
            },
        })
        const results = await response.json()
        const result: DataIRRFType[] = results
        return result
    } catch (err) {
        return 
    }
}