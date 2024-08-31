import { saira } from "@/utils/ChangeFont"
import { DataDepartamentoCargo } from "./components/DataDepartamentoCargo/DataDepartamentoCargo"
import { useEffect, useRef, useState } from "react"
import { DataCargoType } from "@/TypesObjects/DataCargoType/DataCargoType"
import { ModifyModal } from "../ModifyModal/ModifyModal"
import { Toast } from "primereact/toast"

interface ListDepartamentosCargosProps {
    data?: DataCargoType[] | undefined
}

export const ListDepartamentosCargos = ({ data }: ListDepartamentosCargosProps) => {

    const [isShow, setIsShow] = useState(false)
    const [cargo, setCargo] = useState<string>()
    const [departamento, setDepartamento] = useState<string>()
    const [salarioBase, setSalarioBase] = useState<number>()
    const [idCargo, setIdCargo] = useState<number>(0)
    const [idDepartamento, setIdDepartamento] = useState<number|undefined>(0)
    const toast = useRef(null)

    return (
        <div className={`${saira.className} w-[70%] self-center p-8 bg-green-100 rounded-md`}>
            <div className="bg-white flex items-center">
                <div className="grid grid-cols-4 grid-rows-1 w-full border-b border-black p-2">
                    <p className="flex justify-center ">Departamento</p>
                    <p className="flex justify-center ">Cargo</p>
                    <p className="flex justify-center ">Salario Base</p>
                    <p className="flex justify-center ">Ação</p>
                </div>
            </div>
            <div>
                {
                    data?.map(res => <>
                        <DataDepartamentoCargo
                            cargo={res.nomeCargo}
                            IdDepartamento={res.fkDepartamento}
                            salarioBase={res.salario}
                            isShow={isShow}
                            setIsShow={setIsShow} 
                            setCargo={setCargo}
                            setDepartamento={setDepartamento}
                            setSalarioBase={setSalarioBase}
                            setIdCargo={setIdCargo}
                            idCargo={res.idCargo||0}
                            setIdDepartamento={setIdDepartamento}
                        />
                    </>)
                }
            </div>
            <Toast
                className="translate-y-48"
                ref={toast}
            />
            {isShow && <ModifyModal toast={toast} idDepartamento={idDepartamento||0} idCargo={idCargo} nome={{ cargo:cargo, departamento: departamento }} salarioBase={salarioBase} isShow={isShow} setIsShow={setIsShow} />}
        </div>
    )
} 