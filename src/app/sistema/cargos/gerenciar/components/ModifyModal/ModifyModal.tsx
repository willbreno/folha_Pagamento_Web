import { BtnCancel } from "@/Components/Buttons/BtnCancel/BtnCancel"
import { BtnSave } from "@/Components/Buttons/BtnSave/BtnSave"
import { Input } from "@/Components/Input/Input"
import { SelectInput } from "@/Components/SelectInput/SelectInput"
import { CargoDepartamentoOptions } from "@/TypesObjects/CargoDepartamentoType/CargoDepartamentoType"
import { DataCargoType } from "@/TypesObjects/DataCargoType/DataCargoType"
import { patchCargo } from "@/api/patch/patchCargo/patchCargo"
import { patchDepartamento } from "@/api/patch/patchDepartamento/patchDepartamento"
import { useBuscarTodosDepartamento } from "@/hooks/useBuscarTodosDepartamento"
import { SelectDepartamento } from "@/utils/SelectDepartamento/SelectDepartamento"
import { message } from "@/utils/mensagesToast/message"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { HTMLAttributes, MutableRefObject, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isShow: boolean
    setIsShow: (value: boolean) => void
    nome: { departamento: string | undefined, cargo: string | undefined }
    salarioBase?: number
    idCargo:number
    idDepartamento:number
    toast: MutableRefObject<null>

}

export const ModifyModal = ({ isShow, setIsShow, toast, ...rest }: ModalProps) => {
    
    const [tipoCadastro, setTipoCadastro] = useState(2)
    const [departamento, setDepartamento] = useState(rest.idDepartamento)
    const [dataCargo, setDataCargo] = useState<DataCargoType>({fkDepartamento:rest.idDepartamento, nomeCargo:rest.nome.cargo, idCargo:rest.idCargo, salario: rest.salarioBase})
    const client = useQueryClient()
    const DataDepartamento = useBuscarTodosDepartamento()

    const updateCargo = useMutation({
        mutationFn: patchCargo,
        onError: () => message({ toast, detail: 'Erro na execução', severity: 'error', summary: 'Operação' }),
        onMutate: () => message({ toast, detail: 'Aguarde', severity: 'warn', summary: 'Operação' }),
        onSuccess: () => {
            message({ toast, detail: 'Operação realizada com sucesso', severity: 'success', summary: 'Operação' })
            client.invalidateQueries({queryKey: ['TodosCargos']})
            setIsShow(false)
        }
    })
    
    const updateCargoDepartamento = () => {
        
        if (tipoCadastro == 2) {
            updateCargo.mutate(dataCargo)
        }
    }
    useEffect(() => {
        console.log(dataCargo)
    },[dataCargo])

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
                        <h1 className="text-xl font-semibold ">Modificar Cargo</h1>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-3 py-4">
                        <SelectInput
                            onChange={(e) => setTipoCadastro(Number(e.currentTarget.value))}
                            required={true}
                            value={2}
                            options={CargoDepartamentoOptions}
                            disabled={true}
                            text='Departamento / Cargo'
                            defaultValue={2}
                        />
                        {
                            tipoCadastro == 1 ? <>
                                <Input required={true} text="Nome" type="text" eventInput={() => {}} defaultValue={0} value={rest.nome.departamento} />
                            </> : <>
                                <Input required={true} disabled={tipoCadastro == 0} text="Nome" type="text" value={dataCargo.nomeCargo} eventInput={(e) => {
                                    setDataCargo({...dataCargo, nomeCargo:e})
                                }} />
                                <SelectInput
                                    onChange={(e) => {setDataCargo({...dataCargo, fkDepartamento:Number(e.currentTarget.value)})}}
                                    required={true}
                                    value={dataCargo.fkDepartamento}
                                    options={SelectDepartamento(DataDepartamento.data)}
                                    text='Departamento'
                                    defaultValue={0}
                                    disabled={!(tipoCadastro == 2)}
                                />
                                <Input required={true} disabled={tipoCadastro == 0} text="Salario Base" value={dataCargo.salario} type="number" min={0} max={99999} eventInput={(e) => setDataCargo({...dataCargo, salario:Number(e)})} />
                            </>
                        }
                    </div>
                    <div className="flex gap-3 justify-end">
                        <BtnSave eventClick={() => { updateCargoDepartamento()}} toastEvent={() => { }} />
                        <BtnCancel toastEvent={() => {}} eventClick={() => setIsShow(false)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


/*
    Add Efeitos nos eventos!!
*/