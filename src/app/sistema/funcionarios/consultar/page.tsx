'use client'
import { BtnBack } from "@/Components/Buttons/BtnBack/BtnBack"
import { Input } from "@/Components/Input/Input"
import { DataUserList } from "./components/DataUserList/DataUserList"
import { saira } from "@/utils/ChangeFont"
import { BtnConsult } from "@/Components/Buttons/BtnConsult/BtnConsult"
import { BtnErase } from "@/Components/Buttons/BtnErase/BtnErase"
import { SelectInput } from '@/Components/SelectInput/SelectInput'
import { StatusOptions } from '@/TypesObjects/SelectStatus/SelectStatus'
import { ConsultaFuncionarioProps, ConsultaFuncionarioPropsClean } from '@/TypesObjects/FormConsultaFuncionarios/FormConsultaFuncionarios'
import { useEffect, useRef, useState } from 'react'
import { Toast } from "primereact/toast"
import { showSuccess } from "@/utils/mensagesToast/showSuccess"
import { useValidateToken } from "@/hooks/useValidateToken"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"


export default function Page() {

    const [formConsulta, setFormConsulta] = useState<ConsultaFuncionarioProps>({ fkStatus: '' })
    const [formConsultaSubmit, setFormConsultaSubmit] = useState<ConsultaFuncionarioProps>({ fkStatus: '' })
    const toast = useRef(null)
    function sendResquest(value: string): void {

    }
    const handleChangeInput = (type: string, value: string | number) => {
        if (value) setFormConsulta({ ...formConsulta, [`${type}`]: value })
        if (value == 0) value = ''
        setFormConsulta({ ...formConsulta, [`${type}`]: value })
    }

    const handleSubmit = () => {
        setFormConsultaSubmit({ ...formConsulta })
    }

    const handleEraseInput = () => {
        setFormConsulta({ ...ConsultaFuncionarioPropsClean(formConsulta) })

    }

    const handleKeyDown = (e: string) => {
        if (e === "Enter") { handleSubmit(); showSuccess(toast) }
    }


    const { data } = useValidateToken()
    const router = useRouter()
    const client = useQueryClient()
    useEffect(() => {
        if (data) {
            if (data == 403) router.push("/")
            if (data == 401) router.push("/")
        }
        console.log(data)
    }, [data])
    useEffect(() => {
        client.invalidateQueries({ queryKey: ['ValidateToken'] })
    }, [])



    return (
        <div className={`${saira.className} flex flex-col gap-6 h-fit`}>
            <div className="w-fit py-4">
                <BtnBack />
            </div>
            <h1 className="font-extrabold text-4xl">Consultar Funcionários</h1>
            <div className="flex flex-col gap-12 p-10 w-full">
                <form onKeyDown={(e) => handleKeyDown(e.key)} className="flex flex-col gap-12 w-full">
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-4 grid-rows-1 w-3/4 h-fit gap-2">
                            <Input
                                onChange={(e) => handleChangeInput("nome", e.currentTarget.value)}
                                eventInput={sendResquest}
                                value={formConsulta["nome"]}
                                type="text"
                                text="Nome"
                                placeholder="Mario Alberto"
                            />
                            <Input
                                onChange={(e) => handleChangeInput("cpf", e.currentTarget.value)}
                                value={formConsulta["cpf"]}
                                eventInput={sendResquest}
                                type="text"
                                text="CPF"
                                placeholder="123.456.789.12"
                            />
                            <Input
                                onChange={(e) => handleChangeInput("FkDepartamento", e.currentTarget.value)}
                                eventInput={sendResquest}
                                value={formConsulta["FkDepartamento"]}
                                type="text"
                                text="Departamento"
                                placeholder="Desenvolvimento"
                            />
                            <Input
                                onChange={(e) => handleChangeInput("FkCargo", e.currentTarget.value)}
                                eventInput={sendResquest}
                                value={formConsulta["FkCargo"]}
                                type="text"
                                text="Cargo"
                                placeholder="Analista QA"
                            />
                        </div>
                        <div className="grid grid-cols-4 grid-rows-1 w-3/4 h-fit gap-2">
                            <Input
                                onChange={(e) => handleChangeInput("matricula", Number(e.currentTarget.value))}
                                eventInput={sendResquest}
                                value={formConsulta["matricula"]}
                                type="text"
                                text="Matricula"
                                placeholder="1234"

                            />
                            <Input
                                onChange={(e) => handleChangeInput("admissaoInicio", e.currentTarget.value)}
                                eventInput={sendResquest}
                                type="date"
                                text="Admissão Inicio"
                                placeholder="Mario Alberto"
                            />
                            <Input
                                onChange={(e) => handleChangeInput("admissaoFim", e.currentTarget.value)}
                                eventInput={sendResquest}
                                type="date"
                                text="Admissão Fim"
                                placeholder="123.456.789.12"
                            />
                            <SelectInput
                                onChange={(e) => handleChangeInput("fkStatus", Number(e.currentTarget.value))}
                                required={true}
                                value={formConsulta["fkStatus"]}
                                options={StatusOptions}
                                text='Status'
                                defaultValue={1}
                            />
                        </div>
                    </div>
                </form>
                <div className="flex gap-2">
                    <Toast
                        className="translate-y-48"
                        ref={toast}
                    />
                    <BtnConsult
                        eventClick={handleSubmit}
                        toastEvent={() => showSuccess(toast)}
                    />
                    <BtnErase
                        eventClick={handleEraseInput}
                        toastEvent={() => showSuccess(toast)}
                    />
                </div>
            </div>
            <DataUserList {...formConsultaSubmit} />
        </div>
    )
}