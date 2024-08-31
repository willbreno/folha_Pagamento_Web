import { DataCargoType } from "@/TypesObjects/DataCargoType/DataCargoType";
import { OptionProps } from "@/TypesObjects/SelectStatus/SelectStatus"
import { useBuscarCargos } from "@/hooks/useBuscarTodosCargos";

export const SelectCargo = (data:DataCargoType[]|undefined, idDepartamento?:number) => {
    let Options :OptionProps[] = [{value: -1, label: "Selecione"}];
    if(!idDepartamento || idDepartamento == -1) return Options
    data?.map(result =>{
        Options.push({value: result?.idCargo, label: result?.nomeCargo})
    })
    return Options
}