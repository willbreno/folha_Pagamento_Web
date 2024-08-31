import { Save } from "lucide-react"
import { Button } from "../Button"
import { EventsProps } from "@/TypesObjects/EventsProps/EventsProps"


export const BtnActive = ({eventClick}:EventsProps) => {

    return(
        <Button onClick={eventClick} icon={Save} text="Ativar Funcionario" className="border-green-600 hover:bg-green-100" />
    )
}