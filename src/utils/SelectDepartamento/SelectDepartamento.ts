import { DataDepartamentoType } from "@/TypesObjects/DataDepartamentoType/DataDepartamentoType";
import { OptionProps } from "@/TypesObjects/SelectStatus/SelectStatus"

export const SelectDepartamento = (data: DataDepartamentoType[]|undefined) => {
    let Options :OptionProps[] = [{value: 0, label: "Selecione"}];
    data?.map(result =>{
        Options.push({value: result.idDepartamento, label: result.nome})
    })
    return Options
}





