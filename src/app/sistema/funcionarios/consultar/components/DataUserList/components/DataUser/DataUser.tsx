import { StatusType } from "@/TypesObjects/StatusType/StatusType"
import { saira } from "@/utils/ChangeFont"
import { Edit, Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface DataUserProps {
    matricula:number
    nome:string
    cpf:string
    cargo:string
    departamento:string
    status:string|number
}

export const DataUser = ({...rest}:DataUserProps) => {

    const router = useRouter()
    const handleNavigation = (matricula:number) => {
        router.push(`/sistema/funcionario/${matricula}/consultar`)
    }

    return(
        <div className={`${saira.className} grid grid-cols-6 grid-rows-1 p-3 py-8 hover:bg-green-300 rounded-md`}>
            <p className="flex justify-start uppercase">{rest.nome}</p>
            <p className="flex justify-center">{rest.cpf}</p>
            <p className="flex justify-center">{rest.departamento}</p>
            <p className="flex justify-center"> {rest.cargo}</p>
            <p className="flex justify-center">{StatusType(Number(rest.status))}</p>
            <div className="flex justify-center items-center gap-4">
                <button onClick={() => handleNavigation(rest.matricula)} className="border border-black rounded-md w-fit h-fit p-1">
                    <Search />
                </button>
            </div>
        </div>
    )
}