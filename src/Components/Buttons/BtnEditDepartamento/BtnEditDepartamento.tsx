import { Edit2 } from "lucide-react"
import { Button } from "../Button"
import { EventsProps } from "@/TypesObjects/EventsProps/EventsProps"



export const BtnEditDepartamento = ({toastEvent, eventClick}:EventsProps) => {

   
    return(
        <Button onClick={() => {eventClick();toastEvent()}} icon={Edit2} text="Editar Departamento" className="border-yellow-500 hover:bg-yellow-100" />
    )
}