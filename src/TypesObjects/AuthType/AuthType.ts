import { PathType } from "../AcessUserType/AcessUserType"

export interface AuthType {
    "matricula": number,
    "senha": string
}


export interface ResponseAuthType {
    "status": statusProps
    "token": {
      "token": string
    },
    "usuario": usuarioProps
  }


  interface statusProps {
    "value": string,
    "statusCode": number
  }

  interface usuarioProps {
    "matricula": number,
    "acesso": {
      "id": number,
      "idAcesso": number,
      "nome": string //converter para json
    }
  }

  export interface PathTypeAcess {
    [key: string]: PathType[]
  }


  export const ResponseAuthBody:ResponseAuthType = {
    "status": {
      "value": "",
      "statusCode": 0
    },
    "token": {
      "token": ""
    },
    "usuario": {
      "matricula": 0,
      "acesso": {
        "id": 0,
        "idAcesso": 0,
        "nome": ""
      }
    }
  }