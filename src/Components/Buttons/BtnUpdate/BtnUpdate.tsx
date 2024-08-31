import { EventsProps } from "@/TypesObjects/EventsProps/EventsProps"
import { Button } from "../Button"


export const BtnUpdate = ({eventClick}:EventsProps) => {

    return(
        <Button onClick={eventClick} text="Atualizar" className="border-orange-600 hover:bg-slate-100" />
    )
}