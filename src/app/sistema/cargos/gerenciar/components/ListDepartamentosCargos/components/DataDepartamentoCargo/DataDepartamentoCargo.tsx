import { saira } from "@/utils/ChangeFont"
import { Edit } from "lucide-react"
import { useBuscarDepartamento } from "@/hooks/useBuscarDepartamento"
import { useEffect, useState } from "react"

interface DepartamentoCargoProps {
    IdDepartamento?: number
    cargo?: string
    salarioBase?: number
    isShow: boolean
    idCargo:number
    setIsShow: (value: boolean) => void
    setDepartamento: (value:string) => void
    setCargo: (value: string) => void 
    setSalarioBase: (value:number) => void
    setIdCargo: (value:number) => void
    setIdDepartamento: (value:number|undefined) => void
}

export const DataDepartamentoCargo = ({ cargo, IdDepartamento, salarioBase, isShow, setIsShow, setCargo, setDepartamento,setSalarioBase,setIdCargo,idCargo,setIdDepartamento }: DepartamentoCargoProps) => {

    const DataDepartamento = useBuscarDepartamento(IdDepartamento||0)
    const [departamentoName, setDepartamentoName] = useState(DataDepartamento.data?.nome)
    useEffect(() =>{
        setDepartamentoName(DataDepartamento.data?.nome)
    },[DataDepartamento.data])

    return (
        <div className={`${saira.className} grid grid-cols-4 grid-rows-1 p-3 py-8 hover:bg-green-300 rounded-md`}>
            <p className="flex justify-center">{departamentoName}</p>
            <p className="flex justify-center">{cargo}</p>
            <p className="flex justify-center">{salarioBase}</p>
            <div className="flex justify-center gap-4">
                <button onClick={() => {
                    setIsShow(!isShow)
                    setDepartamento(departamentoName|| "")
                    setCargo(cargo||"")
                    setSalarioBase(salarioBase||0)
                    setIdCargo(idCargo)
                    setIdDepartamento(IdDepartamento)
                }} className="border border-black rounded-md w-fit h-fit p-1">
                    <Edit />
                </button>
            </div>
        </div>
    )
}