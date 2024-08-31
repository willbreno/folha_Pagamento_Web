import { X } from "lucide-react"
import { Button } from "../Button"
import { EventsProps } from "@/TypesObjects/EventsProps/EventsProps"

export const BtnInactive = ({ eventClick }: EventsProps) => {

    return (
        <Button onClick={eventClick} icon={X} text="Inativar Funcionario" className="border-red-600 hover:bg-red-100" />
    )
}