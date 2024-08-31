import { simularAtraso } from "../responseBuscarPorMatricula/responseBuscarPorMatricula"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_VALIDATE_TOKEN as string

export const ValidateToken = async () => {



    return fetch(`${url}`, {
        method: "GET",
        headers: headers(),
        next: {
            revalidate: 1000 * 10
        },
    })

        .then(results => results.status)
        .catch(err => console.log(err))
}