import Modal from 'react-modal'

type Props = {
    isOpen: boolean
    success: boolean
    content: string
    close: () => void
}

Modal.setAppElement('#main')

const PlayAgainModal = ({ isOpen, success, content, close }: Props) => {
    return (
        <Modal
            className="fixed z-50 top-1/4 overflow-y-auto overflow-x-hidden justify-center items-center focus:outline-none"
            isOpen={isOpen}
            onRequestClose={close}
            overlayClassName="flex absolute z-40 top-0 h-screen w-screen justify-center bg-green-800/50"
            shouldCloseOnOverlayClick={true}>
            <div className="relative p-1 w-full max-w-md max-h-full rounded-xl bg-gradient-to-br from-red-200 via-red-300 to-yellow-200">
                <div className="relative w-full h-full px-5 py-2.5 rounded-lg shadow bg-gradient-to-br from-green-400 to-blue-600">
                    <button
                        type="button"
                        className="absolute top-3 end-2.5 text-white bg-transparent hover:text-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        data-modal-hide="popup-modal"
                        onClick={close}>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        {success ? (
                            <svg
                                className="mx-auto mb-4 text-white w-12 h-12"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="mx-auto mb-4 text-white w-12 h-12"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M21.972 11.517a.527.527 0 0 0-1.034-.105 1.377 1.377 0 0 1-1.324 1.01 1.467 1.467 0 0 1-1.4-1.009.526.526 0 0 0-1.015 0 1.467 1.467 0 0 1-2.737.143l-.049-.204.021-.146V9.369h2.304a2.632 2.632 0 0 0 2.631-2.632 2.678 2.678 0 0 0-2.654-2.632l-.526.022-.13-.369A2.632 2.632 0 0 0 13.579 2c-.461 0-.915.124-1.313.358L12 2.513l-.266-.155A2.603 2.603 0 0 0 10.422 2a2.632 2.632 0 0 0-2.483 1.759l-.13.37-.518-.024a2.681 2.681 0 0 0-2.66 2.632A2.632 2.632 0 0 0 7.264 9.37H9.61v1.887l-.007.09-.028.08a1.328 1.328 0 0 1-1.301.996 1.632 1.632 0 0 1-1.502-1.024.526.526 0 0 0-1.01.013 1.474 1.474 0 0 1-1.404 1.01 1.381 1.381 0 0 1-1.325-1.01.547.547 0 0 0-.569-.382h-.008a.526.526 0 0 0-.456.526v.446a10.012 10.012 0 0 0 10 10 9.904 9.904 0 0 0 7.067-2.94A10.019 10.019 0 0 0 22 11.966l-.028-.449ZM8.316 15.685a1.053 1.053 0 1 1 2.105 0 1.053 1.053 0 0 1-2.105 0Zm1.58 3.684a2.105 2.105 0 0 1 4.21 0h-4.21Zm4.736-2.631a1.052 1.052 0 1 1 0-2.105 1.052 1.052 0 0 1 0 2.105Z" />
                            </svg>
                        )}
                        <h3 className="mb-5 text-lg font-normal text-white">
                            {content}
                        </h3>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="inline-flex items-center justify-center p-0.5 mb-2 ml-0 max-w-fit overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-400 mt-2"
                            onClick={() => window.location.reload()}>
                            <span className="inline-flex items-center justify-center px-5 py-2.5 w-full h-full transition-all ease-in duration-75 bg-green-700 rounded-md group-hover:bg-opacity-0">
                                Play again
                            </span>
                        </button>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="inline-flex items-center justify-center p-0.5 mb-2 ml-2 max-w-fit overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-800 mt-2"
                            onClick={close}>
                            <span className="inline-flex items-center justify-center px-5 py-2.5 w-full h-full transition-all ease-in duration-75 bg-gray-600 rounded-md group-hover:bg-opacity-0">
                                Close
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PlayAgainModal
