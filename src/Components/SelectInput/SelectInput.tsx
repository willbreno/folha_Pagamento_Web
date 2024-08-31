import { useState } from "react"
import { saira } from "@/utils/ChangeFont";
import { SelectProps } from "@/TypesObjects/SelectStatus/SelectStatus";



export const SelectInput = ({ text, options, required,defaultValue, ...rest }: SelectProps) => {
    const [isShow, setIsShow] = useState(false);
    
    return (
        <div className={`${saira.className} flex flex-col w-full gap-2`} onClick={() => setIsShow(true)} >
            <span className={`cursor-default`}>{text}</span>
            <select 
                {...rest}
                defaultValue={defaultValue && 1} 
                name={"SelectInput"}
                id="SelectInput"
                className={` 
                    focus:outline-none
                    border
                    rounded-md
                    w-full
                    p-2
                    ${required && "border-s-4 border-s-red-500"}
                `}>
                {options.map(option => <option value={option.value}>{option.label}</option>)}
            </select>
        </div>
    )
}