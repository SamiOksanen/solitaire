import Header from '@/components/Header';
import Link from 'next/link';

const Solitaire = () => {
    return (
        <div>
            <Header title="Solitaire" hasBackLink={false}></Header>
            <Link
                key={'klondike-link'}
                href={'klondike'}
                passHref
                replace
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 mt-2"
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-green-800 rounded-md group-hover:bg-opacity-0">
                    Klondike solitaire
                </span>
            </Link>
        </div>
    );
};

export default Solitaire;
