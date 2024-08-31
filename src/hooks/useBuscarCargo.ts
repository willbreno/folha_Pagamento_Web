import { BuscarCargo } from "@/api/response/responseBuscarCargo/responseBuscarCargo"
import { useQuery } from "@tanstack/react-query"

export const useBuscarCargo = (idCargo?: number) => {
    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => BuscarCargo(idCargo),
        queryKey: ['Cargo', idCargo],
        refetchOnWindowFocus: true,
    })

    return {
        data: data,
        Loading: isLoading,
        Error: isError,
        Fetching: isFetching
    }
}

