"use client"


import { useValidateToken } from "@/hooks/useValidateToken"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import React from 'react';
import impermais from "../../../assets/impermais_white.png"
import Image from "next/image"
import { useMainContext } from "@/hooks/useMainContext"

export default function Home() {

  const { data } = useValidateToken()
  const router = useRouter()
  const client = useQueryClient()
  const {dataLogin} = useMainContext()

  const text = "Somos mais do que uma empresa de impermeabilização, somos artesãos da proteção, moldando um futuro à prova d'água. Aqui, na IMPERMAIS, transcendemos os limites convencionais para criar soluções que não apenas selam edifícios, mas também inspiram confiança e durabilidade!"
  useEffect(() => {
    if (data) {
      if (data == 403) router.push("/")
      if (data == 401) router.push("/")
    }
  }, [data])
  useEffect(() => {
    client.invalidateQueries({ queryKey: ['ValidateToken'] })
  }, [])

  return (
    <div className="w-full h-[70vh] overflow-hidden bg-impermaisColor rounded-3xl border-4 shadow-lg relative">
      <div className="w-[60%] h-full flex end-0 justify-center absolute">
        <div className="flex flex-col justify-evenly">
          <div className="flex justify-center w-full">
            <h2 className="text-white text-5xl text-center w-3/4">Bem-vindo ao mundo da Impermeabilização inovadora!!</h2>
          </div>
          <div className="flex justify-center w-full">
            <h2 className="text-white w-3/4 text-center text-2xl">{text}</h2>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full h-full flex flex-col justify-end relative" >
          <div className="w-full h-full">
          </div>
          <div className="w-full h-full flex flex-col justify-end">
            <div className="w-[45%] h-3/4 absolute bg-white rounded-e-full flex justify-center items-end"></div>
            <div className="w-[90%] h-full bg-white rounded-ss-full rounded-se-full flex justify-end items-center z-10">
              <div className="w-full h-full flex justify-center items-end">
                <Image src={impermais} alt="Logo" className="rounded-full" />
                <button className="z-50" onClick={() => console.log(dataLogin)}>Teste</button>

              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full" >
        </div>
      </div>
      
    </div>
  )
}
