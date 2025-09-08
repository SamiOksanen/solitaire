import type { Metadata } from 'next'
import 'src/app/globals.css'

export const metadata: Metadata = {
    title: 'Spider Solitaire (Easy)',
}

export default function SpiderEasyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}
