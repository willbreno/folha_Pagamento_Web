import { CadastraFuncionarioGeralProps } from "@/TypesObjects/FormCadastraFuncionarios/FormCadastraFuncionarios";
import { headers } from "@/utils/HeaderApi/HeaderApi";

const api_url = process.env.NEXT_PUBLIC_URL_FUNCIONARIO as string

export const patchFuncionario = async (addFuncionario: CadastraFuncionarioGeralProps) => {
    const response = await fetch(`${api_url}AtualizarFuncionario`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(addFuncionario),
    });

    const results = await response.json()
    const result: DataUserType = results
    return result
};

