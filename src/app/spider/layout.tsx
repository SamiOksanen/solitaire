import type { Metadata } from 'next'
import 'src/app/globals.css'

export const metadata: Metadata = {
    title: 'Spider Solitaire',
}

export default function SpiderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}
