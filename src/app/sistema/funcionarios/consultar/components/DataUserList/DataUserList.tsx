`use client`
import { saira } from "@/utils/ChangeFont"
import { DataUser } from "./components/DataUser/DataUser"
import { useTodosDadosFuncionarios } from "@/hooks/useTodosDadosFuncionarios"
import { ConsultaFuncionarioProps } from "@/TypesObjects/FormConsultaFuncionarios/FormConsultaFuncionarios"
import { LoadingComponent } from "@/Components/LoadingComponent/LoadingComponent"
export const DataUserList = ({...rest}:ConsultaFuncionarioProps) => {

    const {data,Loading,Error} = useTodosDadosFuncionarios(rest)
   
    return (
        <div className={`${saira.className} w-[92%] h-fit  self-center p-8 bg-green-100 rounded-md `}>
                <div className="bg-white flex items-center">
                    <div className="grid grid-cols-6 grid-rows-1 w-full border-b border-black p-2">
                        <p className="flex justify-center ">Nome</p>
                        <p className="flex justify-center ">CPF</p>
                        <p className="flex justify-center ">Departamento</p>
                        <p className="flex justify-center ">Cargo</p>
                        <p className="flex justify-center ">Status</p>
                        <p className="flex justify-center ">Ação</p>
                    </div>
                </div>
                <div className="">
                    {Loading ? <><LoadingComponent /></> : Error ? <>Erro</> : <>
                        {data?.map(result => <DataUser 
                            key={result.matricula}
                            matricula={result.matricula}
                            nome={result.nome}
                            status={result.fkStatus}
                            cargo={`${result.fkCargo}`} 
                            cpf={result.cpf} 
                            departamento={`${result.fkDepartamento}`} 
                        />)}
                    </>}
                </div>
            </div>
    )
} 