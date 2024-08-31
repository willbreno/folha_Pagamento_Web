import { BuscarEmail } from "@/api/response/responseBuscarEmail/responseBuscarEmail"
import { useQuery } from "@tanstack/react-query"

export const useBuscarEmail = (matricula: number) => {
    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => BuscarEmail(matricula),
        queryKey: ['Email', matricula],
        refetchOnWindowFocus: false,
    })

    return {
        data: data,
        Loading: isLoading,
        Error: isError,
        Fetching: isFetching
    }
}

