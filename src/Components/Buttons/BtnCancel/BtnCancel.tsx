import { X } from "lucide-react"
import { Button } from "../Button"
import { EventsProps } from "@/TypesObjects/EventsProps/EventsProps"


export const BtnCancel = ({eventClick}:EventsProps) => {

    return (
        <Button onClick={eventClick} icon={X} text="Cancelar" className="border-red-600 hover:bg-red-100" />
    )
}