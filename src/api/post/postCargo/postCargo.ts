import { DataCargoType } from "@/TypesObjects/DataCargoType/DataCargoType";
import { headers } from "@/utils/HeaderApi/HeaderApi";

const api_url = process.env.NEXT_PUBLIC_URL_CARGO as string

export const postCargo = async (addCargo: DataCargoType|undefined) => {
    const response = await fetch(`${api_url}AdicionarFuncionarioCargo`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(addCargo),
    });

    const results = await response.json()
    const result: DataCargoType = results
    return result
};

