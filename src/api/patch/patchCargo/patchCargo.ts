import { DataCargoType } from "@/TypesObjects/DataCargoType/DataCargoType";
import { headers } from "@/utils/HeaderApi/HeaderApi";

const api_url = process.env.NEXT_PUBLIC_URL_CARGO as string

export const patchCargo = async (modifyCargo: DataCargoType) => {
    const response = await fetch(`${api_url}AtualizarFuncionarioCargo`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(modifyCargo),
    });

    const results = await response.json()
    const result: DataCargoType = results
    return result
};

