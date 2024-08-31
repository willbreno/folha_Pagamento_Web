import { ValidateToken } from "@/api/response/responseValidateToken/responseValidateToken"
import { useQuery } from "@tanstack/react-query"

export const useValidateToken = () => {
    const {data, isLoading, isError,isFetching} = useQuery({
        queryFn: () => ValidateToken(),
        queryKey: ['ValidateToken'],
        refetchOnWindowFocus: true,
        staleTime:30000
    })

    return{
        data:data,
        Loading: isLoading,
        Error:isError,
        Fetching:isFetching
    }
}