import { useRouter } from "next/navigation"

interface OptionProps{
    Text:String
    Href:String
    fatherPath?:string
}
export const Option = ({Href,Text,fatherPath}:OptionProps) => {

    const router = useRouter()
    const handleNavigation = () =>{
        if(fatherPath) router.push(`/${fatherPath}/${Href}`)
        else router.push(`/${Href}`)
    }

    return(
        <div className="">
            <div 
                onClick={() => handleNavigation()}
                className="place-self-center self-center w-52 px-2 py-1 bg-gray-100 hover:bg-gray-300 cursor-pointer border-gray-950 "
            >
                <p className="w-full">{Text}</p>
            </div>
        </div>
    )
}