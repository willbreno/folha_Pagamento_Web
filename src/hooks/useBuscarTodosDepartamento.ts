import { BuscarTodosDepartamento } from "@/api/response/responseBuscarTodosDepartamento/responseBuscarTodosDepartamento"
import { useQuery } from "@tanstack/react-query"

export const useBuscarTodosDepartamento = () => {
    const {data, isLoading, isError,isFetching} = useQuery({
        queryFn: () => BuscarTodosDepartamento(),
        queryKey: ['TodosDepartamentos'],
        refetchOnWindowFocus: true,

    })

    return{
        data:data,
        Loading: isLoading,
        Error:isError,
        Fetching:isFetching
    }
}