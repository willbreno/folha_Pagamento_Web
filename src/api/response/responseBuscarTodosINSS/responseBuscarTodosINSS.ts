import { DataINSSType } from "@/TypesObjects/DataINSSType/DataINSSType"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_INSS as string
export const BuscarTodosINSS = async () => {
    try {
        const response = await fetch(`${url}`, {
            method: "GET",
            headers: headers(),
            next: {
                revalidate: 1000 * 10
            },
        })
        const results = await response.json()
        const result: DataINSSType[] = results
        return result
    } catch (err) {
        return 
    }
}