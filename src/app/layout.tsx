import 'src/app/globals.css'
import Footer from 'src/components/Footer'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <div
                    id="main"
                    className="min-h-screen w-screen overflow-hidden text-white text-base bg-linear-to-br from-green-600 to-green-900">
                    <section className="relative z-10">{children}</section>
                    <Footer />
                </div>
            </body>
        </html>
    )
}
