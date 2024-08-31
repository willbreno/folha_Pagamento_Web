import { BtnCancel } from "@/Components/Buttons/BtnCancel/BtnCancel"
import { BtnSave } from "@/Components/Buttons/BtnSave/BtnSave"
import { Input } from "@/Components/Input/Input"
import { SelectInput } from "@/Components/SelectInput/SelectInput"
import { DataDepartamentoType } from "@/TypesObjects/DataDepartamentoType/DataDepartamentoType"
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
    toast: MutableRefObject<null>
}

export const ModifyModalDepartamento = ({ isShow, setIsShow, toast, ...rest }: ModalProps) => {

    const [tipoCadastro, setTipoCadastro] = useState(1)
    const [dataDepartamento, setDataDepartamento] = useState<DataDepartamentoType>({ status: 1, nome: "" })
    const client = useQueryClient()
    const DataDepartamento = useBuscarTodosDepartamento()

    const updateDepartamento = useMutation({
        mutationFn: patchDepartamento,
        onError: () => message({ toast, detail: 'Erro na execução', severity: 'error', summary: 'Operação' }),
        onMutate: () => message({ toast, detail: 'Aguarde', severity: 'warn', summary: 'Operação' }),
        onSuccess: () => {
            message({ toast, detail: 'Operação realizada com sucesso', severity: 'success', summary: 'Operação' })
            client.invalidateQueries({ queryKey: ['SingleDepartamento'] })
            client.invalidateQueries({ queryKey: ['TodosDepartamentos'] })
            setIsShow(false)
        }
    })

    useEffect(() => {
        console.log(dataDepartamento)
    }, [dataDepartamento])

    const updateCargoDepartamento = () => {
        if (tipoCadastro == 1) {
            updateDepartamento.mutate(dataDepartamento)
        }
    }

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
                        <h1 className="text-xl font-semibold ">Modificar Departamento</h1>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-3 py-4">
                        <SelectInput
                            onChange={(e) => { setDataDepartamento({...dataDepartamento, idDepartamento:Number(e.currentTarget.value)}) } }
                            required={true}
                            value={dataDepartamento.idDepartamento}
                            options={SelectDepartamento(DataDepartamento.data)}
                            text='Departamento'
                            defaultValue={0}
                        />
                        <Input required={true} disabled={tipoCadastro == 0} text="Modificar Departamento" type="text" value={dataDepartamento.nome} eventInput={(e) => {
                            setDataDepartamento({ ...dataDepartamento, nome:e })
                        }} />
                    </div>
                    <div className="flex gap-3 justify-end">
                        <BtnSave eventClick={() => { updateCargoDepartamento() }} toastEvent={() => { }} />
                        <BtnCancel toastEvent={() => {}} eventClick={() => setIsShow(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}


/*
    Add Efeitos nos eventos!!
*/