import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'CatalogLab06',
    description: '',
}
export default function CatalogLayout({
    children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    )
}
