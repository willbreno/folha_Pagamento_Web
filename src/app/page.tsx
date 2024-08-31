'use client'

import { LoadingComponent } from "@/Components/LoadingComponent/LoadingComponent"
import { useRouter } from "next/navigation"
import { useEffect } from 'react'
import image from "../../assets/imagemTrabalhador2.png"
import Image from "next/image"
export default function Page() {
    const router = useRouter()
    useEffect(() => {
      setTimeout(() => {router.push("/login")},2000)
      
    }, [])
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#2E4C1F]">
          <LoadingComponent />
          <Image className="rounded-xl" src={image} alt="Logo" />
        </div>
    )
}