import { Plus } from "lucide-react"
import { Button } from "../Button"

interface ButtonProps {
    handleEvent: () => void
}

export const BtnNew = ({handleEvent}:ButtonProps) => {

    
    return(
        <Button onClick={handleEvent} icon={Plus} text="Novo" className="border-green-600 hover:bg-slate-100" />
    )
}