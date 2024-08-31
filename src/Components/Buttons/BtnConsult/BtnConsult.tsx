import { Search } from "lucide-react"
import { Button } from "../Button"
import { EventsProps } from "@/TypesObjects/EventsProps/EventsProps"



export const BtnConsult = ({eventClick,toastEvent}:EventsProps) => {

    return(
        <Button onClick={() => {eventClick(),toastEvent()}} icon={Search} text="Consultar" className="border-green-600 hover:bg-green-100" />
    )
}