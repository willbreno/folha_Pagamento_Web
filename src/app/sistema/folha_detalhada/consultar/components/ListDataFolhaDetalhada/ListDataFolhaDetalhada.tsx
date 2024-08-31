import { saira } from "@/utils/ChangeFont"
import { useEffect, useRef, useState } from "react"
import { Toast } from "primereact/toast"
import { DataFolhaDetalhadaType } from "@/TypesObjects/DataFolhaDetalhadaType/DataFolhaDetalhadaType"
import { DataFolhaDetalhada } from "../DataFolhaDetalhada/DataFolhaDetalhada"
import { useBuscarFolhaDetalhadaGeral } from "@/hooks/useBuscarFolhaDetalhadaGeral"

interface ListFolhaDetalhadaProps {
    data?: DataFolhaDetalhadaType[] | undefined
}

export const ListDataFolhaDetalhada = ({ data }: ListFolhaDetalhadaProps) => {

    const toast = useRef(null)


    const [folhaDetalhada, setFolhaDetalhada] = useState<DataFolhaDetalhadaType>()
    const dataFolhaDetalhada = useBuscarFolhaDetalhadaGeral({...folhaDetalhada})

    return (
        <div className={`${saira.className} w-[70%] self-center p-8 bg-green-100 rounded-md`}>
            <div className="bg-white flex items-center">
                <div className="grid grid-cols-7 grid-rows-1 w-full border-b border-black p-2">
                    <p className="flex justify-center ">Matricula</p>
                    <p className="flex justify-center ">Nome</p>
                    <p className="flex justify-center ">CPF</p>
                    <p className="flex justify-center ">Salario Bruto</p>
                    <p className="flex justify-center ">Salario Liquido</p>
                    <p className="flex justify-center ">Data</p>
                    <p className="flex justify-center ">Ação</p>
                </div>
            </div>
            <div>
                {dataFolhaDetalhada.data?.map( res => {
                    return(
                        <DataFolhaDetalhada data={res.dataEmite} matricula={res.fkMatricula || 0} salarioBruto={res.salarioBruto|| 0} salarioLiquido={res.salarioFinal||0}   />
                    )
                })}
            </div>
            <Toast
                className="translate-y-48"
                ref={toast}
            />
            {/* {isShow && <ModifyModal toast={toast} idDepartamento={idDepartamento||0} idCargo={idCargo} nome={{ cargo:cargo, departamento: departamento }} salarioBase={salarioBase} isShow={isShow} setIsShow={setIsShow} />} */}
        </div>
    )
} 