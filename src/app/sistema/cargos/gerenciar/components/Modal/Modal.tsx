import { BtnCancel } from "@/Components/Buttons/BtnCancel/BtnCancel"
import { BtnSave } from "@/Components/Buttons/BtnSave/BtnSave"
import { Input } from "@/Components/Input/Input"
import { SelectInput } from "@/Components/SelectInput/SelectInput"
import { CargoDepartamentoOptions } from "@/TypesObjects/CargoDepartamentoType/CargoDepartamentoType"
import { DataCargoType } from "@/TypesObjects/DataCargoType/DataCargoType"
import { DataDepartamentoType } from "@/TypesObjects/DataDepartamentoType/DataDepartamentoType"
import { postCargo } from "@/api/post/postCargo/postCargo"
import { postDepartamento } from "@/api/post/postDepartamento/postDepartamento"
import { useBuscarTodosDepartamento } from "@/hooks/useBuscarTodosDepartamento"
import { SelectDepartamento } from "@/utils/SelectDepartamento/SelectDepartamento"
import { message } from "@/utils/mensagesToast/message"
import { useMutation, useMutationState, useQueryClient } from "@tanstack/react-query"
import { Toast } from "primereact/toast"
import { HTMLAttributes, MutableRefObject, useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isShow: boolean
    setIsShow: (value: boolean) => void
    toast: MutableRefObject<null>
}

export const Modal = ({ isShow, setIsShow, toast, ...rest }: ModalProps) => {
    function handleEvent(value: string): void {
        throw new Error("Function not implemented.")
    }

    const [tipoCadastro, setTipoCadastro] = useState(0)

    const DataDepartamento = useBuscarTodosDepartamento()
    const client = useQueryClient()

    const [dataCargo, setDataCargo] = useState<DataCargoType>({ cargaHoraria: 40 })
    const [dataDepartamento, setDataDepartamento] = useState<DataDepartamentoType>({status:1, nome:""})
    const [departamento, setDepartamento] = useState(0)
    const newCargo = useMutation({
        mutationFn: postCargo,
        onError: () => message({ toast, detail: 'Erro na execução', severity: 'error', summary: 'Operação' }),
        onMutate: () => message({ toast, detail: 'Aguarde', severity: 'warn', summary: 'Operação' }),
        onSuccess: () => {
            message({ toast, detail: 'Operação realizada com sucesso', severity: 'success', summary: 'Operação' })
            client.invalidateQueries({queryKey: ['TodosCargos']})
            setIsShow(false)
        }
    })
    const newDepartamento = useMutation({
        mutationFn: postDepartamento,
        onError: () => message({ toast, detail: 'Erro na execução', severity: 'error', summary: 'Operação' }),
        onMutate: () => message({ toast, detail: 'Aguarde', severity: 'warn', summary: 'Operação' }),
        onSuccess: () => {
            message({ toast, detail: 'Operação realizada com sucesso', severity: 'success', summary: 'Operação' })
            client.invalidateQueries({queryKey: ['TodosDepartamentos']})
            setIsShow(false)
        }
    })
    const addCargoDepartamento = () => {
        if (tipoCadastro == 1) {
            newDepartamento.mutate(dataDepartamento)
        }
        if (tipoCadastro == 2) {
            newCargo.mutate(dataCargo)
        }
    }

    useEffect(() => {
         if(newDepartamento.isSuccess) console.log(newDepartamento)
    }, [newCargo, newDepartamento])
    return (
        <div className={twMerge('w-full h-screen fixed top-0 left-0 flex justify-center items-center ', rest.className)}>
            
            <div className={`
                w-1/2 h-fit max-w-[800px]
                fixed  
                border border-green-700 
                shadow-2xl rounded-2xl 
                overflow-hidden
            `}>
                <div className="absolute w-full h-full bg-white opacity-90 -z-10"></div>
                <div className="p-3 py-10">
                    <div className="flex justify-center ">
                        <h1 className="text-xl font-semibold ">Cadastrar Cargo / Departamento</h1>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-3 py-4">
                        <SelectInput
                            onChange={(e) => setTipoCadastro(Number(e.currentTarget.value))}
                            required={true}
                            value={tipoCadastro}
                            options={CargoDepartamentoOptions}
                            text='Departamento / Cargo'
                            defaultValue={0}
                        />
                        <Input required={true} disabled={tipoCadastro == 0} text="Nome" type="text" eventInput={(e) => {
                            setDataCargo({ ...dataCargo, nomeCargo: e })
                            setDataDepartamento({ ...dataDepartamento, nome: e })
                        }} />
                        <SelectInput
                            onChange={(e) => setDataCargo({ ...dataCargo, fkDepartamento: Number(e.currentTarget.value) })}
                            required={true}
                            value={dataCargo?.fkDepartamento}
                            options={SelectDepartamento(DataDepartamento.data)}
                            text='Departamento'
                            defaultValue={0}
                            disabled={!(tipoCadastro == 2)}
                        />
                        <Input disabled={!(tipoCadastro == 2)} required={true} text="Salario" type="number" min={0} max={99999} eventInput={(e) => {
                            setDataCargo({ ...dataCargo, salario: Number(e) })
                        }} />
                    </div>
                    <div className="flex gap-3 justify-end">

                        <BtnSave eventClick={() => addCargoDepartamento()} toastEvent={() => { }} />
                        <BtnCancel toastEvent={() => {}} eventClick={() => setIsShow(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}