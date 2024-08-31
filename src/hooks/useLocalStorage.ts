import { useEffect, useState } from "react"

export const useLocalStorage = <T>(item: string, valueInitial: T) => {

    // const [data, setData] = useState(valueInitial)
    // useEffect(() => {

    //     if (typeof globalThis === "undefined") return
    //     const valueInLocal = localStorage.getItem(item)
    //     if (valueInLocal) {
    //         setData(JSON.parse(valueInLocal))
    //     }
    // }, [globalThis])

    const setLocalStorageAuth = (newValue: { token: string }) => {
        //const isTokenTrue = existingToken()
        localStorage.setItem(item, JSON.stringify(newValue.token))
        
    }

    const getLocalStorageAuth = () => {
        const tokenExisting = localStorage.getItem(item)
        if(tokenExisting) return JSON.parse(tokenExisting)
        return ''
    }

    const deleteLocalStorageAuth = () => {
        localStorage.removeItem("token")
    }
    
    
    return {
        // data,
        setLocalStorageAuth,
        getLocalStorageAuth,
        deleteLocalStorageAuth
    }
}   