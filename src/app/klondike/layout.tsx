import 'src/app/globals.css';
import Header from 'src/components/Header';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="klondike">
            <Header title="Klondike Solitaire" hasBackLink />
            <section>{children}</section>
        </div>
    );
}
