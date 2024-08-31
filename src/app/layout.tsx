'use client'
import './globals.css'
import type { Metadata } from 'next'
import { saira } from '@/utils/ChangeFont'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrimeReactProvider } from 'primereact/api'
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
      {<MainContextProvider>
        <QueryClientProvider client={QClient}>
          <PrimeReactProvider>
            <body className={saira.className}>
              {children}
            </body>
          </PrimeReactProvider>
        </QueryClientProvider>
      </MainContextProvider>}
    </html>
  )
}
