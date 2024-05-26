import Link from 'next/link'

type HeaderProps = {
    title: string
    hasBackLink?: boolean
}

const Header = ({ title, hasBackLink }: HeaderProps) => (
    <div className="cards max-w-7xl mx-auto p-2 grid grid-rows-1 grid-cols-3 gap-4">
        {hasBackLink && (
            <Link
                key={'home-link'}
                href={'/'}
                passHref
                replace
                className="relative inline-flex items-center justify-center p-0.5 mb-2 ml-2 max-w-fit overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 mt-2">
                <div className="relative inline-flex items-center justify-center px-5 py-2.5 w-full h-full transition-all ease-in duration-75 bg-green-800 rounded-md group-hover:bg-opacity-0">
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                    Back
                </div>
            </Link>
        )}
        <h1
            className="col-start-2 whitespace-nowrap text-3xl text-white font-bold py-2.5"
            data-test-id="pageTitle">
            {title}
        </h1>
    </div>
)

export default Header
