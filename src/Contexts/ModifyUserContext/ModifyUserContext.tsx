import { ReactNode, createContext } from "react";

interface ProviderProps{
    children: ReactNode
}

export const ModifyUserContext = createContext({
    {/* Parametros a seres usados globalmente */}
})

export const ModifyUserContextProvider = ({children}:ProviderProps) =>{
    return(
        <ModifyUserContext.Provider value={{
            {/* set de estado dos parametros globais */}
        }}
        >
            {children}
        </ModifyUserContext.Provider>
    )
}