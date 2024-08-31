'use client'
import { BtnBack } from "@/Components/Buttons/BtnBack/BtnBack";
import { BtnConsult } from "@/Components/Buttons/BtnConsult/BtnConsult";
import { BtnNew } from "@/Components/Buttons/BtnNew/BtnNew";
import { useEffect, useRef, useState } from "react";
import { SelectInput } from "@/Components/SelectInput/SelectInput";
import { Toast } from "primereact/toast";
import { Input } from "@/Components/Input/Input";
import { useValidateToken } from "@/hooks/useValidateToken";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";


export default function Page() {

    const [isShow, setIsShow] = useState(false)
    function handleEvent() {
        setIsShow(!isShow)
    }
    const [cargo, setCargo] = useState(0)
    const toast = useRef(null)

    const validateToken = useValidateToken()
    const router = useRouter()
    const client = useQueryClient()
    useEffect(() => {
        if (validateToken.data) {
            if (validateToken.data == 403) router.push("/")
            if (validateToken.data == 401) router.push("/")
        }
    }, [validateToken.data])
    useEffect(() => {
        client.invalidateQueries({ queryKey: ['ValidateToken'] })
    }, [])


    return (
        <div className="w-full h-fit flex flex-col gap-6">
            <div className="w-fit py-4">
                <BtnBack />
            </div>
            <h1 className="font-extrabold text-4xl">Holerite</h1>
            <div className="flex flex-col gap-12 p-10 w-full">
                <div className="grid grid-cols-3 grid-rows-1 w-[80%] h-fit gap-2">
                    <Input type="text" eventInput={() => { }} text="Matricula" required={true} />
                    <Input type="text" eventInput={() => { }} text="Nome" />
                    <Input type="text" eventInput={() => { }} text="CPF" />
                    <SelectInput
                        onChange={(e) => { }}
                        required={true}
                        value={0}
                        options={[]}
                        text='Ano'
                        defaultValue={0}
                    />
                    <SelectInput
                        onChange={(e) => { setCargo(Number(e.currentTarget.value)) }}
                        required={true}
                        value={0}
                        options={[]}
                        text='Mes'
                        defaultValue={0}
                    />
                </div>
                <div className="flex gap-3 ">
                    <BtnConsult
                        eventClick={() => {}}
                        toastEvent={() => { }}
                    />
                    <BtnNew
                        handleEvent={handleEvent}
                    />
                </div>
                {/* <ListDataFolhaDetalhada /> */}
            </div>

            <Toast
                className="translate-y-48"
                ref={toast}
            />
            {/* {isShow && <Modal
                toast={toast}
                isShow={isShow}
                setIsShow={setIsShow}
            />} */}
        </div>
    )
}