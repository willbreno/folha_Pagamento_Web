import { DataDepartamentoType } from "@/TypesObjects/DataDepartamentoType/DataDepartamentoType";
import { headers } from "@/utils/HeaderApi/HeaderApi";

const api_url = process.env.NEXT_PUBLIC_URL_DEPARTAMENTO as string

export const patchDepartamento = async (modifyDepartamento: DataDepartamentoType) => {
    const response = await fetch(`${api_url}AtualizarDepartamentoFuncionario`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(modifyDepartamento),
    });

    const results = await response.json()
    const result: DataDepartamentoType = results
    return result
};

