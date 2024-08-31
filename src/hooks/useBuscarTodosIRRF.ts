import { BuscarTodosIRRF } from "@/api/response/responseBuscarTodosIRRF/responseBuscarTodosIRRF"
import { useQuery } from "@tanstack/react-query"

export const useBuscarTodosIRRF = () => {
    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => BuscarTodosIRRF(),
        queryKey: ['Inss'],
        refetchOnWindowFocus: false,
    })

    return {
        data: data,
        Loading: isLoading,
        Error: isError,
        Fetching: isFetching
    }
}