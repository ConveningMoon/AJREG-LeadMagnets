import { EB_Garamond, Montserrat } from 'next/font/google'

export const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-garamond',
  display: 'swap',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})
