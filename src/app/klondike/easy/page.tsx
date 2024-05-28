'use client'

import React, { useEffect, useState } from 'react'
import { DragDropContext, DragStart, DropResult } from '@hello-pangea/dnd'
import Confetti from 'react-confetti'
import {
    gridGapXClass,
    gridGapYClass,
    gridMarginTopClasses,
    gridMaxWidthClasses,
    handleCardMovementEnd,
    handleCardMovementStart,
    handleStockPileClick,
} from 'src/utils/cards.util'
import Stack from 'src/components/stack/Stack'
import useScreenHeight from 'src/utils/hooks/useScreenHeight'
import useScreenWidth from 'src/utils/hooks/useScreenWidth'
import {
    getSetup,
    hasValidMovesLeft,
    isAllowedMove,
    isCompleted,
} from 'src/app/klondike/klondike.util'
import AlertModal from 'src/components/modal/AlertModal'
import PlayAgainModal from 'src/components/modal/PlayAgainModal'
import Header from 'src/components/Header'

const Klondike = () => {
    const [cards, setCards] = useState(getSetup())
    const [alertModalIsOpen, setAlertModalIsOpen] = useState(false)
    const [alertModalContent, setAlertModalContent] = useState('')
    const [retryModalIsOpen, setRetryModalIsOpen] = useState(false)
    const [retryModalContent, setRetryModalContent] = useState('')
    const [completed, setCompleted] = useState(false)

    const screenHeight = useScreenHeight()
    const screenWidth = useScreenWidth()

    const handleOnDragStart = (start: DragStart) => {
        setCards(handleCardMovementStart(start, cards))
    }

    const handleOnDragEnd = (result: DropResult) => {
        setCards(
            handleCardMovementEnd(
                result,
                cards,
                isAllowedMove(result, cards, openAlertModal, true)
            )
        )
    }

    useEffect(() => {
        if (isCompleted(cards)) {
            setCompleted(true)
            setRetryModalContent(
                'Congratulations! You have completed the game!'
            )
            setRetryModalIsOpen(true)
        } else {
            if (!hasValidMovesLeft(cards, 1, true)) {
                setRetryModalContent('No more moves left!')
                setRetryModalIsOpen(true)
            }
        }
    }, [cards])

    const handleStockPileCardClick = () => {
        setCards(handleStockPileClick(cards, 1))
    }

    const openAlertModal = (content: string) => {
        setAlertModalContent(content)
        setAlertModalIsOpen(true)
    }

    return (
        <>
            <Header title="Klondike Solitaire (Easy)" hasBackLink />
            <DragDropContext
                onDragStart={handleOnDragStart}
                onDragEnd={handleOnDragEnd}>
                <div
                    id="cards"
                    className={`cards items-end ${gridMaxWidthClasses[screenHeight]} mx-auto ${gridMarginTopClasses[screenHeight]} px-2 grid grid-rows-2 grid-cols-7 ${gridGapYClass[screenHeight]} ${gridGapXClass[screenWidth]}`}>
                    <Stack
                        id={1}
                        cards={cards.filter((c) => c.boardPosition === 1)}
                        screenHeight={screenHeight}
                        spreadStyle="sm"
                        handleCardClick={() =>
                            handleStockPileCardClick()
                        }></Stack>
                    <Stack
                        id={2}
                        cards={cards.filter((c) => c.boardPosition === 2)}
                        screenHeight={screenHeight}
                        spreadStyle="sm"></Stack>
                    <div></div>
                    <Stack
                        id={3}
                        cards={cards.filter((c) => c.boardPosition === 3)}
                        screenHeight={screenHeight}
                        spreadStyle="sm"></Stack>
                    <Stack
                        id={4}
                        cards={cards.filter((c) => c.boardPosition === 4)}
                        screenHeight={screenHeight}
                        spreadStyle="sm"></Stack>
                    <Stack
                        id={5}
                        cards={cards.filter((c) => c.boardPosition === 5)}
                        screenHeight={screenHeight}
                        spreadStyle="sm"></Stack>
                    <Stack
                        id={6}
                        cards={cards.filter((c) => c.boardPosition === 6)}
                        screenHeight={screenHeight}
                        spreadStyle="sm"></Stack>
                    <Stack
                        id={7}
                        cards={cards.filter((c) => c.boardPosition === 7)}
                        screenHeight={screenHeight}></Stack>
                    <Stack
                        id={8}
                        cards={cards.filter((c) => c.boardPosition === 8)}
                        screenHeight={screenHeight}></Stack>
                    <Stack
                        id={9}
                        cards={cards.filter((c) => c.boardPosition === 9)}
                        screenHeight={screenHeight}></Stack>
                    <Stack
                        id={10}
                        cards={cards.filter((c) => c.boardPosition === 10)}
                        screenHeight={screenHeight}></Stack>
                    <Stack
                        id={11}
                        cards={cards.filter((c) => c.boardPosition === 11)}
                        screenHeight={screenHeight}></Stack>
                    <Stack
                        id={12}
                        cards={cards.filter((c) => c.boardPosition === 12)}
                        screenHeight={screenHeight}></Stack>
                    <Stack
                        id={13}
                        cards={cards.filter((c) => c.boardPosition === 13)}
                        screenHeight={screenHeight}></Stack>
                </div>
                <AlertModal
                    isOpen={alertModalIsOpen}
                    close={() => setAlertModalIsOpen(false)}
                    content={alertModalContent}
                />
                <PlayAgainModal
                    isOpen={retryModalIsOpen}
                    close={() => setRetryModalIsOpen(false)}
                    content={retryModalContent}
                    success={completed}
                />
                {completed && <Confetti />}
            </DragDropContext>
        </>
    )
}

export default Klondike
