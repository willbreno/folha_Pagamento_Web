import { BuscarTelefone } from "@/api/response/responseBuscarTelefone/responseBuscarTelefone"
import { useQuery } from "@tanstack/react-query"

export const useBuscarTelefone = (matricula: number) => {
    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => BuscarTelefone(matricula),
        queryKey: ['Telefone', matricula],
        refetchOnWindowFocus: false,
    })

    return {
        data: data,
        Loading: isLoading,
        Error: isError,
        Fetching: isFetching
    }
}

