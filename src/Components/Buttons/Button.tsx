import { ButtonHTMLAttributes, ElementType } from "react"
import { twMerge } from "tailwind-merge"
import {Button as Button2} from 'primereact/button';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    icon?: ElementType
    text: string
}



export const Button = ({icon:Icon, text, ...rest}:ButtonProps) => {
    return(
        <div>
            <Button2 
                children={
                    <>
                        {Icon && <Icon className="w-5 h-5" />}
                        <p>{text}</p>
                    </>} 
                {...rest} 
                className={twMerge(`flex
                    px-4 py-1
                    rounded-lg
                    justify-center items-center gap-2
                    border
                    transition-all
                `,rest.className)}
            />
            
        </div>
    )
}