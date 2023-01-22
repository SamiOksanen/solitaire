import './globals.css';
import Footer from 'src/components/Footer';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <div className="h-screen w-screen overflow-hidden text-white bg-gradient-to-br from-green-600 to-green-900">
                    <section className="relative z-10">{children}</section>
                    <Footer></Footer>
                </div>
            </body>
        </html>
    );
}
