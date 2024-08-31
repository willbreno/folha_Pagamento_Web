'use client'
import { BtnBack } from "@/Components/Buttons/BtnBack/BtnBack";
import { InputImpostos } from "./components/InputImpostos/InputImpostos";
import { SingleInputImposto } from "./components/SingleInputImposto/SingleInputImposto";
import { useBuscarTodosINSS } from "@/hooks/useBuscarTodosINSS";
import { useEffect } from "react";
import { useBuscarTodosIRRF } from "@/hooks/useBuscarTodosIRRF";
import { useValidateToken } from "@/hooks/useValidateToken";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function Page() {

    const eventInput = (value: string): void => {
        throw new Error("Function not implemented.");
    }

    const teste = useBuscarTodosINSS()

    useEffect(() => {
        console.log(teste.data)
    }, [teste])

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
            <h1 className="font-extrabold text-4xl">Impostos e Taxas</h1>
            <div className="border border-green-500 rounded-2xl w-5/6 max-w-6xl h-fit self-center ">
                <div className="flex sm:flex-col 2xl:flex-row  w-full 2xl:h-96">
                    <div className="w-full">
                        <div className="flex w-full justify-center p-5">
                            <h2 className="text-2xl font-semibold">
                                IRRF
                            </h2>
                        </div>
                        <div className="flex justify-center w-full px-5 gap-6">
                            <div className="flex flex-col w-72 justify-center items-center ">
                                <h3>Base de Calculo</h3>
                                <InputImpostos />
                                <InputImpostos />
                                <InputImpostos />
                                <InputImpostos />
                                <InputImpostos />
                            </div>
                            <div className="flex flex-col w-fit items-center">
                                <h3>Aliquota</h3>
                                <SingleInputImposto />
                                <SingleInputImposto />
                                <SingleInputImposto />
                                <SingleInputImposto />
                                <SingleInputImposto />
                            </div>
                            <div className="flex flex-col w-fit items-center ">
                                <h3>Dedução</h3>
                                <SingleInputImposto />
                                <SingleInputImposto />
                                <SingleInputImposto />
                                <SingleInputImposto />
                                <SingleInputImposto />

                            </div>

                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex w-full justify-center p-5">
                            <h2 className="text-2xl font-semibold">
                                INSS
                            </h2>
                        </div>
                        <div className="flex flex-col w-full px-5 justify-center">
                            <div className="flex w-full items-center ">
                                <div className="w-full flex justify-center">
                                    <h3>Faixa de Salário</h3>
                                </div>
                                <div className="w-1/2 flex justify-center ">
                                    <h3>Aliquota</h3>
                                </div>                                
                            </div>
                            <div className="flex w-full gap-14 ">
                                <div className="w-[65%]">
                                    <InputImpostos  />
                                </div>
                                <SingleInputImposto />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex justify-center p-5">
                    <h2 className="text-2xl text-center">
                        Fundo de Garantia do Tempo de Serviço (FGTS) <strong> 8% </strong> do Salário bruto pago ao trabalhador.
                    </h2>
                </div>
            </div>
        </div>
    )
}



{/* <div className="flex w-full justify-center p-5">
                            <h2 className="text-2xl font-semibold">
                                INSS
                            </h2>
                        </div>
                        <div className="flex w-full px-5 justify-center gap-6">
                            <div className="flex flex-col w-72 items-center ">
                                <h3>Faixa de Salário</h3>
                                <InputImpostos />
                                <InputImpostos />
                                <InputImpostos />
                                <InputImpostos />
                            </div>
                            <div className="flex flex-col w-fit items-center">
                                <h3>Aliquota</h3>
                                <SingleInputImposto />
                                <SingleInputImposto />
                                <SingleInputImposto />
                                <SingleInputImposto />
                            </div>
                        </div> */}