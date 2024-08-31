'use client'
import { BtnBack } from "@/Components/Buttons/BtnBack/BtnBack";
import { ListDepartamentosCargos } from "./components/ListDepartamentosCargos/ListDepartamentosCargos";
import { BtnConsult } from "@/Components/Buttons/BtnConsult/BtnConsult";
import { BtnErase } from "@/Components/Buttons/BtnErase/BtnErase";
import { BtnNew } from "@/Components/Buttons/BtnNew/BtnNew";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./components/Modal/Modal";
import { SelectInput } from "@/Components/SelectInput/SelectInput";
import { useBuscarTodosDepartamento } from "@/hooks/useBuscarTodosDepartamento";
import { useBuscarCargos } from "@/hooks/useBuscarTodosCargos";
import { SelectDepartamento } from "@/utils/SelectDepartamento/SelectDepartamento";
import { SelectCargo } from "@/utils/SelectCargo/SelectCargo";
import { useBuscarCargo } from "@/hooks/useBuscarCargo";
import { Toast } from "primereact/toast";
import { BtnEditDepartamento } from "@/Components/Buttons/BtnEditDepartamento/BtnEditDepartamento";
import { ModifyModalDepartamento } from "./components/ModifyModalDepartamento/ModifyModalDepartamento";
import { useValidateToken } from "@/hooks/useValidateToken";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function Page() {

    const [isShow, setIsShow] = useState(false)
    const [isShowModifyDepartamento, setIsShowModifyDepartamento] = useState(false)
    const DataDepartamento = useBuscarTodosDepartamento()
    function sendResquest(value: string): void {
        throw new Error("Function not implemented.");
    }
    function handleEvent() {
        setIsShow(!isShow)
    }
    function handleEventIsModifyDepartamento() {
        setIsShowModifyDepartamento(!isShowModifyDepartamento)
    }

    const [departamento, setDepartamento] = useState(0)
    const [cargo, setCargo] = useState(0)
    const toast = useRef(null)
    const DataCargosWithDepartamento = useBuscarCargos(departamento)
    const DataCargosWithoutDepartamento = useBuscarCargo(cargo)

    const validateToken = useValidateToken()
    const router = useRouter()
    const client = useQueryClient()
    useEffect(() => {
        if (validateToken.data) {
            if (validateToken.data == 403) router.push("/")
            if (validateToken.data == 401) router.push("/")
        }
    }, [validateToken.data])
    useEffect(() => {
        client.invalidateQueries({ queryKey: ['ValidateToken'] })
    }, [])


    return (
        <div className="w-full h-fit flex flex-col gap-6">
            <div className="w-fit py-4">
                <BtnBack />
            </div>
            <h1 className="font-extrabold text-4xl">Departamentos e Cargos</h1>
            <div className="flex flex-col gap-12 p-10 w-full">
                <div className="grid grid-cols-4 grid-rows-1 w-[80%] h-fit gap-2">
                    <SelectInput
                        onChange={(e) => setDepartamento(Number(e.currentTarget.value))}
                        required={true}
                        value={departamento}
                        options={SelectDepartamento(DataDepartamento.data)}
                        text='Departamento'
                        defaultValue={0}
                        disabled={false}
                    />
                    <SelectInput
                        onChange={(e) => { setCargo(Number(e.currentTarget.value)) }}
                        required={true}
                        value={cargo}
                        options={SelectCargo(DataCargosWithDepartamento.data, departamento)}
                        text='Cargo'
                        defaultValue={0}
                        disabled={departamento == 0}
                    />
                </div>
                <div className="flex gap-3 ">
                    <BtnConsult
                        eventClick={() => { }}
                        toastEvent={() => { }}
                    />
                    <BtnEditDepartamento 
                        eventClick={handleEventIsModifyDepartamento}
                        toastEvent={() => { }}
                    />
                    
                    <BtnNew
                        handleEvent={handleEvent}
                    />

                    
                </div>
            </div>
            <ListDepartamentosCargos
                data={DataCargosWithDepartamento.data}
            />
            {isShow && <Modal
                toast={toast}
                isShow={isShow}
                setIsShow={setIsShow}
            />}
            {isShowModifyDepartamento && <ModifyModalDepartamento
                toast={toast}
                isShow={isShowModifyDepartamento}
                setIsShow={setIsShowModifyDepartamento}
            />}
            <Toast
                className="translate-y-48"
                ref={toast}
            />
        </div>
    )
}