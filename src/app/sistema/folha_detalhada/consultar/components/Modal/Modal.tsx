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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { HTMLAttributes, MutableRefObject, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isShow: boolean
    setIsShow: (value: boolean) => void
    toast: MutableRefObject<null>
}

export const Modal = ({ isShow, setIsShow, toast, ...rest }: ModalProps) => {


    const client = useQueryClient()

    // const [dataCargo, setDataCargo] = useState<DataCargoType>({ cargaHoraria: 40 })
    // const [dataDepartamento, setDataDepartamento] = useState<DataDepartamentoType>({status:1, nome:""})
    // const newCargo = useMutation({
    //     mutationFn: postCargo,
    //     onError: () => message({ toast, detail: 'Erro na execução', severity: 'error', summary: 'Operação' }),
    //     onMutate: () => message({ toast, detail: 'Aguarde', severity: 'warn', summary: 'Operação' }),
    //     onSuccess: () => {
    //         message({ toast, detail: 'Operação realizada com sucesso', severity: 'success', summary: 'Operação' })
    //         client.invalidateQueries({queryKey: ['TodosCargos']})
    //         setIsShow(false)
    //     }
    // })
    // const newDepartamento = useMutation({
    //     mutationFn: postDepartamento,
    //     onError: () => message({ toast, detail: 'Erro na execução', severity: 'error', summary: 'Operação' }),
    //     onMutate: () => message({ toast, detail: 'Aguarde', severity: 'warn', summary: 'Operação' }),
    //     onSuccess: () => {
    //         message({ toast, detail: 'Operação realizada com sucesso', severity: 'success', summary: 'Operação' })
    //         client.invalidateQueries({queryKey: ['TodosDepartamentos']})
    //         setIsShow(false)
    //     }
    // })
    // const addCargoDepartamento = () => {
    //     if (tipoCadastro == 1) {
    //         newDepartamento.mutate(dataDepartamento)
    //     }
    //     if (tipoCadastro == 2) {
    //         newCargo.mutate(dataCargo)
    //     }
    // }


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
                        <h1 className="text-xl font-semibold ">Gerar Folha Detalhada</h1>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-3 py-4">
                        <Input required={true} text="Matricula" type="text" eventInput={(e) => { }} />
                        <Input required={true} text="Nome" type="text" eventInput={(e) => { }} />

                        <SelectInput
                            onChange={(e) => { }}
                            required={true}
                            value={0}
                            options={CargoDepartamentoOptions}
                            text='Ano'
                            defaultValue={0}
                        />
                        <SelectInput
                            onChange={(e) => {}}
                            required={true}
                            value={0}
                            options={CargoDepartamentoOptions}
                            text='Mes'
                            defaultValue={0}
                        />

                        <Input required={true} text="Salario" type="number" min={0} max={99999} eventInput={(e) => {

                        }} />
                    </div>
                    <div className="flex gap-3 justify-end">

                        <BtnSave eventClick={() => { }} toastEvent={() => { }} />
                        <BtnCancel handleEvent={() => setIsShow(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}