import { BuscarTodosCargos } from "@/api/response/responseBuscarTodosCargos/responseBuscarTodosCargos"
import { useQuery } from "@tanstack/react-query"

export const useBuscarCargos = (idDepartamento?:number) => {
    const {data, isLoading, isError,isFetching} = useQuery({
        queryFn: () => BuscarTodosCargos(idDepartamento),
        queryKey: ['TodosCargos', idDepartamento],
        refetchOnWindowFocus: false,
    })

    return{
        data:data,
        Loading: isLoading,
        Error:isError,
        Fetching:isFetching
    }
}