import { Button } from "../Button"



export const BtnNext = () => {

    const handleNavigation = () => {}
    return(
        <Button onClick={handleNavigation} text="Próximo" className="border-green-600 hover:bg-slate-100" />
    )
}