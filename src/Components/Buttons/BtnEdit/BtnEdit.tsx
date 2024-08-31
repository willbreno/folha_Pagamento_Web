import { Edit2 } from "lucide-react"
import { Button } from "../Button"
import { EventsProps } from "@/TypesObjects/EventsProps/EventsProps"



export const BtnEdit = ({toastEvent, eventClick}:EventsProps) => {

   
    return(
        <Button onClick={() => {eventClick();toastEvent()}} icon={Edit2} text="Editar" className="border-green-600 hover:bg-green-100" />
    )
}