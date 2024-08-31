import { saira } from "@/utils/ChangeFont"
import { Edit, Search } from "lucide-react"
import { useBuscarDepartamento } from "@/hooks/useBuscarDepartamento"
import { useEffect, useState } from "react"
import { useBuscarFolhaDetalhadaGeral } from "@/hooks/useBuscarFolhaDetalhadaGeral"
import { useBuscarPorMatricula } from "@/hooks/useBuscarPorMatricula"

interface DataFolhaDetalhadaProps {
    matricula: number
    salarioBruto?:number
    salarioLiquido?:number   
    data?:string
}

export const DataFolhaDetalhada = ({...rest}: DataFolhaDetalhadaProps) => {

    const dataFuncionario = useBuscarPorMatricula(rest.matricula)
    
    return (
        <div className={`${saira.className} grid grid-cols-7 grid-rows-1 p-3 py-8 hover:bg-green-300 rounded-md`}>
            <p className="flex justify-center">{rest.matricula}</p>
            <p className="flex justify-center">{dataFuncionario.data?.nome}</p>
            <p className="flex justify-center">{dataFuncionario.data?.cpf}</p>
            <p className="flex justify-center">{rest.salarioBruto}</p>
            <p className="flex justify-center">{rest.salarioLiquido}</p>
            <p className="flex justify-center">{rest.data}</p>
            <div className="flex justify-center gap-4">
                <button onClick={() => {}} className="border border-black rounded-md w-fit h-fit p-1">
                    <Search />
                </button>
            </div>
        </div>
    )
}