import { CadastroEnderecoProps } from "@/TypesObjects/FormEndereco/FormEndereco"
import { headers } from "@/utils/HeaderApi/HeaderApi"

const url = process.env.NEXT_PUBLIC_URL_ENDERECO as string
export const BuscarEndereco = async (matricula:number) => {
    try {
        const response = await fetch(`${url}?FkMatricula=${matricula}`, {
            method: "GET",
            headers: headers(),
            next: {
                revalidate: 1000 * 10
            },
        })
        const results = await response.json()
        const result: CadastroEnderecoProps = results
        return result
    } catch (err) {
        return 
    }
}