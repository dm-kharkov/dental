import type { ReactElement } from 'react'
import { Metadata } from 'next'
import type { ChildrenProps } from '@/constants/interfaces'

import React from 'react'
import clsx from 'clsx'

import {
  Comfortaa,
  Dela_Gothic_One
} from 'next/font/google'

const chango = Comfortaa({
  weight: '400',
  variable: '--font-comfortaa',
  subsets: ['latin']
})

const gothic = Dela_Gothic_One({
  weight: '400',
  variable: '--font-gothic',
  subsets: ['latin']
})

import { siteMetadata } from './metadata'
import './globals.scss'

export const metadata: Metadata = siteMetadata

const RootLayout = ({ children }: ChildrenProps): ReactElement => {
  return (
    <>
      <html lang='uk'>
        <body
          className={clsx(
            'antialiased',
            chango.variable,
            gothic.variable
          )}
        >
          <main>
            {children}
          </main>
        </body>
      </html>
    </>
  )
}

export default RootLayout
