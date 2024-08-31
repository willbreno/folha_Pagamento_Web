import { BuscarDepartamento } from "@/api/response/responseBuscarDepartamento/responseBuscarDepartamento"
import { useQuery } from "@tanstack/react-query"

export const useBuscarDepartamento = (idDepartamento: number) => {
    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => BuscarDepartamento(idDepartamento),
        queryKey: ['SingleDepartamento', idDepartamento],
        refetchOnWindowFocus: true,
        
    })

    return {
        data: data,
        Loading: isLoading,
        Error: isError,
        Fetching: isFetching
    }
}

