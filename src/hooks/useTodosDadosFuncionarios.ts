import { ConsultaFuncionarioProps } from "@/TypesObjects/FormConsultaFuncionarios/FormConsultaFuncionarios"
import { BuscarFuncionarioGeral } from "@/api/response/responseBuscarTodosFuncionarios/responseBuscarTodosFuncionarios"
import { useQuery } from "@tanstack/react-query"

export const useTodosDadosFuncionarios = ({...rest}:ConsultaFuncionarioProps) =>{
    const {data, isLoading, isError,isFetching} = useQuery({
        queryFn: () => BuscarFuncionarioGeral(rest),
        queryKey: ['AllOfficials',rest],
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
