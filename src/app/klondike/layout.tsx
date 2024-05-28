import type { Metadata } from 'next'
import 'src/app/globals.css'

export const metadata: Metadata = {
    title: 'Klondike Solitaire',
}

export default function KlondikeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}
