import { BuscarTodosINSS } from "@/api/response/responseBuscarTodosINSS/responseBuscarTodosINSS"
import { useQuery } from "@tanstack/react-query"

export const useBuscarTodosINSS = () => {
    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => BuscarTodosINSS(),
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

