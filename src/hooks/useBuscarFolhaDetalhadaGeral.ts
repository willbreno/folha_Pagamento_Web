import { DataFolhaDetalhadaType } from "@/TypesObjects/DataFolhaDetalhadaType/DataFolhaDetalhadaType"
import { BuscarFolhaDetalhadaGeral } from "@/api/response/responseBuscarTodosFolhaDetalhada/responseBuscarTodosFolhaDetalhada"
import { useQuery } from "@tanstack/react-query"

export const useBuscarFolhaDetalhadaGeral = ({...rest}:DataFolhaDetalhadaType) => {
    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => BuscarFolhaDetalhadaGeral(rest),
        queryKey: ['FolhaDetalhadaGeral',rest],
        refetchOnWindowFocus: true,
    })

    return {
        data: data,
        Loading: isLoading,
        Error: isError,
        Fetching: isFetching
    }
}

