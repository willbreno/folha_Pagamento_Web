'use client'
import { Button } from "@/Components/Buttons/Button"
import { Input } from "@/Components/Input/Input"
import { AuthType, ResponseAuthType } from "@/TypesObjects/AuthType/AuthType"
import { postAuthenticator } from "@/api/post/postAuth/postAuth"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import image from "../../../assets/imagemTrabalhador2.png"
import Image from "next/image"
import { message } from "@/utils/mensagesToast/message"
import { Toast } from "primereact/toast"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useMainContext } from "@/hooks/useMainContext"
export default function page() {

    const [nome, setNome] = useState<number>(0)
    const [senha, setSenha] = useState<string>('')
    const [isClick, setIsClick] = useState(false)
    const [loginSenha, setLoginSenha] = useState<AuthType>({ matricula: 0, senha: "" })
    const router = useRouter()
    const toast = useRef(null);
    const login = useMutation({mutationKey: ["dataLogin"] ,mutationFn: postAuthenticator })
    const [dataLogini, setDataLogini] = useState<ResponseAuthType>()
    const {setDataLogin, dataLogin} = useMainContext()
    const { setLocalStorageAuth, deleteLocalStorageAuth } = useLocalStorage("token", [])

    useEffect(() => {
        setLoginSenha({ ...loginSenha, matricula: nome, senha: senha })
    }, [nome, senha])

    useEffect(() => {
        login.mutate((loginSenha))
        setTimeout(() => {
            if (login.data.status.statusCode === 200) {
           
                message({ toast, detail: login.data?.status?.value, severity: 'success', summary: 'Operação' })
                deleteLocalStorageAuth()
                setLocalStorageAuth(login.data.token)
                setDataLogini(login.data)
                console.log("TESTE")
                setTimeout(() => {
                    router.push("/sistema")
                }, 100)
            }
            else {
                if (login.data?.status.statusCode === 410) message({ toast, detail: login.data?.status?.value, severity: 'error', summary: 'Operação' })
                if (login.data?.status.statusCode === 411) message({ toast, detail: login.data?.status?.value, severity: 'warn', summary: 'Operação' })
            }
        },100)
    }, [isClick])
    // useEffect(() => {
    //     deleteLocalStorageAuth()
    // }, [])
    return (
        <div className="flex w-screen h-screen bg-green-950">
            <div className="w-full h-full flex flex-col justify-center rounded-e-full items-center bg-impermaisColor shadow-2xl z-50">
                <div className="flex flex-col justify-evenly items-center gap-40 h-1/4">
                    <h2 className="text-4xl text-white text-center w-3/4">Aqui Seremos um só por que aqui seremos um só</h2>
                    <div><Image src={image} alt="" className="rounded-3xl" /></div>
                </div>

            </div>
            <div className=" w-[80%] h-full flex flex-col justify-center items-end z-50">
                <div className="flex flex-col w-full h-screen justify-center items-center bg-green-950 gap-20">
                    <div className="h-32 z-50"><p className="text-white text-4xl"> Bem Vindo</p> </div>
                    <div className="w-3/4 max-w-[380px] flex flex-col gap-3 justify-center items-center z-50 ">
                        <Input
                            placeholder="Matricula"
                            type="text"
                            eventInput={() => { }}
                            onChange={(e) => setNome(Number(e.currentTarget.value) || 0)}
                            className="border-4 border-black w-32"
                            mask="default"
                        />
                        <Input
                            placeholder="Senha"
                            type="text"

                            eventInput={() => { }}
                            onChange={(e) => setSenha(e.currentTarget.value)}
                            className="border-2 border-black"
                        />
                        <div className="flex w-full justify-between items-center">
                            <Button
                                text="Login"
                                onClick={() => {
                                    
                                    setIsClick(!isClick)
                                    if(dataLogini) setDataLogin(dataLogini)
                                }}
                                className="px-12 hover:bg-green-900 text-white"
                            />
                            <p className="cursor-pointer hover:scale-105 transition-all duration-100 text-white" >Esqueceu a senha?</p>
                        </div>
                    </div>
                    <Toast
                        className=""
                        ref={toast}
                    />
                            <button className="z-50" onClick={() => console.log(dataLogin)}>Teste</button>

                </div>
            </div>
        </div>
    )
}