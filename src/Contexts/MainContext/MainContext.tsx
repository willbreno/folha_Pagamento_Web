'use client'
import { ResponseAuthBody, ResponseAuthType } from "@/TypesObjects/AuthType/AuthType";
import { ReactNode, createContext, useState } from "react";

export const MainContext = createContext({
    authToken: '',
    setAuthToken: (value: string) => {},
    dataLogin: ResponseAuthBody,
    setDataLogin: (value: ResponseAuthType) => {}
})
interface ProviderProps{
    children: ReactNode
}
export const MainContextProvider = ({children}:ProviderProps) =>{
    const [authToken,setAuthToken] = useState('')//
    const [dataLogin,setDataLogin] = useState<ResponseAuthType>(ResponseAuthBody)//
    return(
        <MainContext.Provider value={{
            authToken,
            setAuthToken,
            dataLogin,
            setDataLogin
            }}
        >
            {children}
        </MainContext.Provider>
    )
}
