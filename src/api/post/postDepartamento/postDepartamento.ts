import { DataDepartamentoType } from "@/TypesObjects/DataDepartamentoType/DataDepartamentoType";
import { headers } from "@/utils/HeaderApi/HeaderApi";

const api_url = process.env.NEXT_PUBLIC_URL_DEPARTAMENTO as string

export const postDepartamento = async (addDepartamento: DataDepartamentoType|undefined) => {
    const response = await fetch(`${api_url}AdicionarDepartamentoFuncionario`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(addDepartamento),
    });

    const results = await response.json()
    const result: DataDepartamentoType = results
    return result
};

