'use client'
import '../globals.css'
import type { Metadata } from 'next'
import { saira } from '@/utils/ChangeFont'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import { ReactNode } from 'react';
import { MainContextProvider } from '@/Contexts/MainContext/MainContext';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Seja Bem-Vindo ao Impermais',
}

const QClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-br">
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
