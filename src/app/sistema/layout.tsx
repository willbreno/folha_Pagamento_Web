'use client'
import { Navbar } from '@/Components/Navbar/Navbar'
import '../globals.css'
import type { Metadata } from 'next'
import { saira } from '@/utils/ChangeFont'
import { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import { Footer } from '@/Components/Footer/footer'
import { MainContextProvider } from '@/Contexts/MainContext/MainContext'

export const metadata: Metadata = {
  title: 'Folha de Pagamento',
  description: 'Controle de dados de usuario e pagamentos.',
}
const QClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <MainContextProvider>
        <QueryClientProvider client={QClient}>
          <PrimeReactProvider>
            <body className={`${saira.className} h-fit `}>
              <Navbar />
              <div className='flex flex-col w-full gap-10 pt-52 p-28'>
                {children}
              </div>
              <Footer />
            </body>
          </PrimeReactProvider>
        </QueryClientProvider>
      </MainContextProvider>

    </html>
  )
}
