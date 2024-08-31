import { BuscarEndereco } from "@/api/response/responseBuscarEndereco/responseBuscarEndereco"
import { useQuery } from "@tanstack/react-query"

export const useBuscarEndereco = (matricula: number) => {
    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => BuscarEndereco(matricula),
        queryKey: ['Endereco', matricula],
        refetchOnWindowFocus: false,
    })

    return {
        data: data,
        Loading: isLoading,
        Error: isError,
        Fetching: isFetching
    }
}

