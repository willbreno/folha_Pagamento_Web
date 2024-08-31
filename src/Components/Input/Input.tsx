import { ValidationResultZod, validateCep, validateCpf, validateCtps, validateDate, validateDateAdmission, validateDefault, validatePhone, validatePis, validateRg } from "@/utils/InputsValidations"
import React, { InputHTMLAttributes, useState } from "react"
import { IMaskInput } from "react-imask"

type MaskTypeDefinition = "phone" | "cpf" | "rg" |"cep" |"date"| "pis"| "ctps" |"default" 

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    text?:string
    placeholder?:string 
    type: string
    required?:boolean
    eventInput:(value:string) => void
    mask?: MaskTypeDefinition 
}

type MaskFormats = {
    default: ""
    phone: "(00)0000-0000"
    cpf: "000.000.000-00"
    rg: "00.000.000.0"
    date: "00/00/0000"
    cep: "00000-000"
    pis: "000.00000.00-0"
    ctps: "0000000 | 000-0"
}


export const Input = ({ text, placeholder, type, required, eventInput, mask = "default", minLength, maxLength, ...rest }:InputProps) =>{

    const maskFormat: MaskFormats = {
        default: "",
        phone: "(00)0000-0000",
        cpf: "000.000.000-00",
        rg: "00.000.000.0",
        date: "00/00/0000",
        cep: "00000-000",
        pis: "000.00000.00-0",
        ctps: "0000000 | 000-0"
    }

    const removeSpecialCharacter = (inputText: string) => {
        if (type !== "email") {
            return inputText.replace(/[^\w\s]/gi, '')
        }
        return inputText
    }
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        let validationResult: ValidationResultZod<any> =  { success: false }

        const cleanedSpecialCharacter = removeSpecialCharacter(value)
         
        switch (text) {
            case "CEP":
                validationResult = validateCep(cleanedSpecialCharacter)
                break
            case "Data de Nascimento":
                validationResult = validateDate(cleanedSpecialCharacter)
                break
            case "CPF":
                validationResult = validateCpf(cleanedSpecialCharacter)
                break
            case "RG": 
                validationResult = validateRg(cleanedSpecialCharacter)
                break
            case "Telefone":
                validationResult = validatePhone(cleanedSpecialCharacter)
                break
            case "Carteira de Trabalho":
                validationResult = validateCtps(cleanedSpecialCharacter)
                break
            case "PIS/PASEP": 
                validationResult = validatePis(cleanedSpecialCharacter)
                break
            case "Data Admissão":
                validationResult = validateDateAdmission(cleanedSpecialCharacter)
                break
            default:
                validationResult = validateDefault(cleanedSpecialCharacter)
        }

        const isNotEmpty = cleanedSpecialCharacter.trim() !== ""
        
        const islengthValid = (!minLength || cleanedSpecialCharacter.length >= minLength)
        
        const isValid = required ? (islengthValid && isNotEmpty && validationResult.success) : true

        if (validationResult.success) {
            eventInput(validationResult.data);
          } else {
            console.error(validationResult.error);
          }
        
        event.target.style.borderColor = isValid ? "green" : "red"

        eventInput(cleanedSpecialCharacter)

        console.log(cleanedSpecialCharacter)
    }

    const determinedTypeMask = typeof mask  == "string"  ? maskFormat[mask] : ""

    return(
        <>
            <div className="flex flex-col gap-2 w-full">
                <p>{text}</p>
                <IMaskInput {...rest} required={true} mask={determinedTypeMask} onInput={handleInputChange} type={type} placeholder={placeholder} className={`
                    focus:outline-none
                    border
                    rounded-md
                    w-full
                    p-2
                    ${required && "border-s-4 border-s-red-500"}
                `}/>
            </div>
        </>
    )
}