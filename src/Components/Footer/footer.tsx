import React from 'react'
import Image from 'next/image'
import image from "../../../assets/imagemTrabalhador2.png"

export function Footer() {
  return (
    <footer className="bg-impermaisColor text-white p-8 items-center relative">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Inicio</h2>
          <ul>
            <li><a href="/sistema">Home</a></li>
            <li><a href="/sistema/holerite/consultar">Holerite</a></li>
            <li><a href="/sistema/funcionarios/consultar">Funcionário</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Sobre Nós</h2>
          <ul>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="">Desenvolvedores</a></li>
          </ul>
        </div>

        <div className="flex items-center">
          <div className="border-b border-white mx-8"></div>

          <Image src={image} alt="Logo da Empresa" width={300} height={300} className="mr-8" />

          {/* <div className="flex items-center space-x-4">
            <a className='w-30' href=""><FaWhatsapp /></a>
            <a className='w-30' href=""><FaInstagram /></a>
          </div> */}
        </div>
      </div>
      <div className="bottom-0 left-0 right-0 h-2 bg-impermaisColor text-center text-sm text-white m-4">
        *Este software foi pensado somente para Desktop
      </div>
    </footer>
  )
}
