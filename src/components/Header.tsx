'use client'

import Link from 'next/link'
import useScreenWidth from 'src/utils/hooks/useScreenWidth'

type HeaderProps = {
    title: string
    hasBackLink?: boolean
    hasRestartButton?: boolean
}

const Header = ({ title, hasBackLink, hasRestartButton }: HeaderProps) => {
    const screenWidth = useScreenWidth()
    const iconOnly = screenWidth === 'sm' || screenWidth === 'xs'

    return (
        <div className="cards max-w-7xl mx-auto p-2 grid grid-rows-1 grid-cols-3 gap-4">
            <div className="my-2">
                {hasBackLink && (
                    <Link
                        key={'home-link'}
                        href={'/'}
                        passHref
                        replace
                        className="relative inline-flex items-center justify-center p-0.5 mb-1 mx-1 max-w-fit overflow-hidden text-sm font-medium rounded-lg group bg-linear-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white hover:text-gray-900 focus:ring-4 focus:outline-hidden focus:ring-red-400 mt-2">
                        <div className="relative inline-flex items-center justify-center px-2.5 py-2.5 w-full h-full transition-all ease-in duration-75 bg-green-700 rounded-md group-hover:bg-opacity-0">
                            <svg
                                aria-hidden="true"
                                className={`w-5 h-5 ${iconOnly ? '' : 'mr-1'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"></path>
                            </svg>
                            {iconOnly ? '' : 'Back'}
                        </div>
                    </Link>
                )}
                {hasRestartButton && (
                    <button
                        key={'restart-link'}
                        onClick={() => window.location.reload()}
                        className="relative inline-flex items-center justify-center p-0.5 mb-1 mx-1 max-w-fit overflow-hidden text-sm font-medium rounded-lg group bg-linear-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white hover:text-gray-900 focus:ring-4 focus:outline-hidden focus:ring-red-400 mt-2">
                        <div className="relative inline-flex items-center justify-center px-2.5 py-2.5 w-full h-full transition-all ease-in duration-75 bg-green-700 rounded-md group-hover:bg-opacity-0">
                            <svg
                                className={`w-5 h-5 ${iconOnly ? '' : 'mr-1'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                                />
                            </svg>
                            {iconOnly ? '' : 'Restart'}
                        </div>
                    </button>
                )}
            </div>
            <h1
                className="col-start-2 whitespace-nowrap content-center text-3xl text-white font-bold py-2.5"
                data-test-id="pageTitle">
                {title}
            </h1>
        </div>
    )
}

export default Header
