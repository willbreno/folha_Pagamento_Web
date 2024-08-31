import { AuthType, ResponseAuthType } from "@/TypesObjects/AuthType/AuthType";
import { headers } from "@/utils/HeaderApi/HeaderApi";

const api_url = process.env.NEXT_PUBLIC_URL_AUTH as string

export const postAuthenticator = async (loginFuncionario: AuthType) => {
    const response = await fetch(api_url, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(loginFuncionario),
    });

    const results = await response.json()
    const result: ResponseAuthType = results
    return result
};

