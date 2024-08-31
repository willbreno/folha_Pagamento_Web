import { ReactNode, createContext } from "react";

interface ProviderProps{
    children: ReactNode
}

export const RegisterUserContext = createContext({
    {/* Parametros a seres usados globalmente */}
})

export const RegisterUserContextProvider = ({children}:ProviderProps) =>{
    return(
        <RegisterUserContext.Provider value={{
            {/* set de estado dos parametros globais */}
        }}
        >
            {children}
        </RegisterUserContext.Provider>
    )
}