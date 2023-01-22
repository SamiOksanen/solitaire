import 'src/app/globals.css';
import Header from 'src/components/Header';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header title="Klondike Solitaire" hasBackLink />
            <section>{children}</section>
        </>
    );
}
