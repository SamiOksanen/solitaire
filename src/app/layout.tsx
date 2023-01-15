import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <div className="solitaire h-screen overflow-hidden bg-gradient-to-br from-green-600 to-green-900">
                    <section>{children}</section>
                </div>
            </body>
        </html>
    );
}
