import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../Button"



export const BtnBack = () => {

    const route = useRouter()
    const handleNavigation = () => route.back()
    return(
        <Button onClick={handleNavigation} icon={ChevronLeft} text="Voltar" className="border-green-600 hover:bg-slate-100" />
    )
}