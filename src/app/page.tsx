import type { Metadata } from 'next'
import Link from 'next/link'
import Header from 'src/components/Header'

export const metadata: Metadata = {
    title: 'Solitaire',
}

const Solitaire = () => {
    return (
        <div className="flex flex-col items-center">
            <Header title="Solitaire" hasBackLink={false} />
            <Link
                key={'klondike-link'}
                href={'klondike'}
                passHref
                replace
                className="relative inline-flex items-center justify-center p-0.5 my-1 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-400">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-green-800 rounded-md group-hover:bg-opacity-0">
                    Klondike solitaire
                </span>
            </Link>
            <Link
                key={'klondike-easy-link'}
                href={'klondike/easy'}
                passHref
                replace
                className="relative inline-flex items-center justify-center p-0.5 my-1 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-400">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-green-800 rounded-md group-hover:bg-opacity-0">
                    Klondike solitaire (Easy)
                </span>
            </Link>
            <Link
                key={'spider-link'}
                href={'spider'}
                passHref
                replace
                className="relative inline-flex items-center justify-center p-0.5 my-1 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-400">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-green-800 rounded-md group-hover:bg-opacity-0">
                    Spider solitaire
                </span>
            </Link>
        </div>
    )
}

export default Solitaire
