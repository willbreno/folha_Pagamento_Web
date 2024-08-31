import { CadastroEmailProps } from "@/TypesObjects/FormTelefoneEmail/FormTelefoneEmail"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_EMAIL as string
export const BuscarEmail = async (matricula:number) => {
    try {
        const response = await fetch(`${url}?FkMatricula=${matricula}`, {
            method: "GET",
            headers: headers(),
            next: {
                revalidate: 1000 * 10
            },
        })
        const results = await response.json()
        const result: CadastroEmailProps = results
        return result
    } catch (err) {
        
    }
}