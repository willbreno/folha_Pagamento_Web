import { responseBuscarPorMatricula } from "@/api/response/responseBuscarPorMatricula/responseBuscarPorMatricula"
import { useQuery } from "@tanstack/react-query"

export const useBuscarPorMatricula = (matricula:number) => {
    const {data, isLoading, isError,isFetching} = useQuery({
        queryFn: () => responseBuscarPorMatricula(matricula),
        queryKey: ['findForMatricula',matricula],
        refetchOnWindowFocus: false,
        staleTime:1000*60*10*60,
    })

    return{
        data:data,
        Loading: isLoading,
        Error:isError,
        Fetching:isFetching
    }
}