import { CadastraFuncionarioProps } from "@/TypesObjects/FormCadastraFuncionarios/FormCadastraFuncionarios";
import { headers } from "@/utils/HeaderApi/HeaderApi";

const api_url = process.env.NEXT_PUBLIC_URL_FUNCIONARIO as string

export function simularAtraso() {
    return new Promise((resolve) => {
      
     
  setTimeout(resolve, 200); 
    });
  }
  

export const responseBuscarPorMatricula = (matricula:number) => {

    const url = `${api_url}BuscarFuncionarioMatricula?Matricula=${matricula}`
    return simularAtraso().then(() => {
        return fetch(url, {
            headers: headers(),
            next: {
                revalidate:1000*10
            },
        })
    }).then(response => response.json())
    .then<DataUserType|CadastraFuncionarioProps>(result => result)
        
}