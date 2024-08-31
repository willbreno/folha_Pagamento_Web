import { useState } from "react"
import { Option } from "./Option";
import { saira } from "@/utils/ChangeFont";

interface SelectProps {
    text:string
    values:SelectType[]
}

export const Select = ({text, values }:SelectProps) => {
    const [isShow, setIsShow] = useState(false);
    
    return(
        <div className={`${saira.className}`} onMouseEnter={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)}>
            <span className={`cursor-pointer text-white p-2`}>{text}</span>
            <div>
                <div className={`absolute transition-all duration-300 translate-y-2  ${isShow ? "opacity-100" : "opacity-0"}`}>
                    {isShow ? values.map(teste => <div className="border-b border-gray-950">
                        <Option Text={teste.value} Href={teste.href} fatherPath={teste.fatherPath} />
                    </div>) : <></>}
                </div>
            </div>
        </div>
    )
}