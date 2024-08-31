import { useLocalStorage } from "@/hooks/useLocalStorage"

const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJuYmYiOjE3MDA3ODEzMjYsImV4cCI6MTcwMDc4ODUyNiwiaWF0IjoxNzAwNzgxMzI2fQ.qZoKVJansuMehJkTB5AAx7FvgVpSwEZquSTCkZm0z2g"


export let headers = () => {

    const {getLocalStorageAuth} = useLocalStorage("token", [])

    return {
        accept: 'application/json',
        Authorization: `Bearer ${getLocalStorageAuth()}`,
        'Content-Type': 'application/json'
    }
}