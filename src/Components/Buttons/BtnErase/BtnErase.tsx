import { Eraser } from "lucide-react"
import { Button } from "../Button"
import { EventsProps } from "@/TypesObjects/EventsProps/EventsProps"



export const BtnErase = ({eventClick,toastEvent}:EventsProps) => {

    return(
        <Button onClick={() => {eventClick();toastEvent()}} icon={Eraser} text="Limpar" className="border-yellow-500 hover:bg-yellow-100" />
    )
}