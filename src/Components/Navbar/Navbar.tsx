'use client'
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { Select } from "../Select/Select"
import { UserProfile } from "./UserProfile/UserProfile"
import { saira } from "@/utils/ChangeFont"
import { useMainContext } from '@/hooks/useMainContext'


export const Navbar = () => {

  const router = useRouter()

  

  const handleNavigation = (rota?: string) => {
    router.push(`/${rota ?? ""}`)
  }

  const Teste = [
    {
      value: "Cadastrar", href: "cadastrar", fatherPath: "sistema/funcionarios"
    },
    {
      value: "Consultar", href: "consultar", fatherPath: "sistema/funcionarios"
    },
  ]
  const TesteCargo = [
    {
      value: "Gerenciar", href: "gerenciar", fatherPath: "sistema/cargos"
    },
  ]
  const TesteImpostosTaxas = [
    {
      value: "Consultar Impostos e Taxas", href: "consultar", fatherPath: "sistema/impostos"
    },
    {
      value: "Gerenciar Folha Detalhada", href: "consultar", fatherPath: "sistema/folha_detalhada"
    },
    {
      value: "Gerenciar Folha Normal", href: "consultar", fatherPath: "sistema/folha_normal"
    },
  ]

  const holerite = [
    {
      value: "Consultar", href: "consultar", fatherPath: "sistema/holerite"
    },
    
  ]

  const [showHeader, setShowHeader] = useState(true)
  const [scrollPositionY, setScrollPositionY] = useState(0)
  const handleScroll = () => {
    if(scrollPositionY === 0){
      setShowHeader(true)
      setScrollPositionY(globalThis.scrollY)
    }
    if(scrollPositionY <= globalThis.scrollY){
      setShowHeader(true)
      setScrollPositionY(globalThis.scrollY)
    }
    if(scrollPositionY > globalThis.scrollY){
      setShowHeader(true)
      setScrollPositionY(globalThis.scrollY)
    }   
    else{
      setShowHeader(false)
      setScrollPositionY(globalThis.scrollY)
    }
  }
  useEffect(() => {
    globalThis.addEventListener('scroll', handleScroll)
    return () => globalThis.removeEventListener('scroll', handleScroll)
  }, [showHeader,scrollPositionY])

  return (
    <div className={`
      flex flex-col 
      fixed 
      top-0 
      w-full 
      transition-all
      duration-200
      z-10

      ${saira.className} 
    `}>
      <div className={`
        flex
        w-full 
        items-center 
        p-3 
        z-10
        bg-white
        ${showHeader ? 'visible opacity-100' : 'hidden opacity-0'}
        transition-opacity
        duration-200
        
      `}>
        <a onClick={() => handleNavigation()} className={`text-3xl cursor-pointer text-green-800 font-extrabold`}>IMPERMAIS</a>
        <UserProfile />
      </div>
      <nav className={`w-full h-12 bg-impermaisColor shadow-2xl transition-all duration-300 flex justify-evenly items-center p-12`}>
        <div className="flex gap-4 p-4 text-xl font-medium justify-evenly items-center w-2/3">
          <Select text="Funcionarios" values={Teste} />
          <Select text="Cargos" values={TesteCargo} />
          <Select text="Finanças" values={TesteImpostosTaxas} />
          <Select text="Holerite" values={holerite} />
        </div>

      </nav>
    </div>
  )
}