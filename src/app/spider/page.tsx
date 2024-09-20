'use client'

import React, { useEffect, useState } from 'react'
import { DragDropContext, DragStart, DropResult } from '@hello-pangea/dnd'
import Confetti from 'react-confetti'
import { handleCardMovementStart } from 'src/utils/cards.util'
import Stack from 'src/components/stack/Stack'
import useScreenHeight from 'src/utils/hooks/useScreenHeight'
import useScreenWidth from 'src/utils/hooks/useScreenWidth'
import {
    getSetup,
    handleSpiderCardMovementEnd,
    handleStockPileClick,
    hasValidMovesLeft,
    isAllowedMove,
    isCompleted,
} from 'src/app/spider/spider.util'
import AlertModal from 'src/components/modal/AlertModal'
import PlayAgainModal from 'src/components/modal/PlayAgainModal'
import Header from 'src/components/Header'
import { ScreenHeight, ScreenWidth } from 'src/utils/screen.util'

const Spider = () => {
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
            handleSpiderCardMovementEnd(
                result,
                cards,
                isAllowedMove(result, cards, openAlertModal)
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
            if (!hasValidMovesLeft(cards)) {
                setRetryModalContent('No more moves left!')
                setRetryModalIsOpen(true)
            }
        }
    }, [cards])

    const handleStockPileCardClick = () => {
        setCards(handleStockPileClick(cards))
    }

    const openAlertModal = (content: string) => {
        setAlertModalContent(content)
        setAlertModalIsOpen(true)
    }

    const gridMaxWidthClasses: Record<ScreenHeight, string> = {
        xs: 'max-w-4xl',
        sm: 'max-w-4xl',
        md: 'max-w-6xl',
        lg: 'max-w-6xl',
        xl: 'max-w-6xl',
    }

    const gridMarginTopClasses: Record<ScreenHeight, string> = {
        xs: '-mt-2',
        sm: '-mt-2',
        md: '-mt-2',
        lg: '-mt-2',
        xl: '-mt-40',
    }

    const gridGapXClass: Record<ScreenWidth, string> = {
        xs: 'gap-x-1',
        sm: 'gap-x-1',
        md: 'gap-x-2',
    }

    return (
        <>
            <Header title="Spider Solitaire" hasBackLink hasRestartButton />
            <DragDropContext
                onDragStart={handleOnDragStart}
                onDragEnd={handleOnDragEnd}>
                <div
                    id="cards"
                    className={`cards items-end ${gridMaxWidthClasses[screenHeight]} mx-auto ${gridMarginTopClasses[screenHeight]} px-2 grid grid-rows-2 grid-cols-10 ${gridGapXClass[screenWidth]}`}>
                    <Stack
                        id={0}
                        cards={cards.filter((c) => c.boardPosition === 0)}
                        screenHeight={screenHeight}
                    />
                    <Stack
                        id={1}
                        cards={cards.filter((c) => c.boardPosition === 1)}
                        screenHeight={screenHeight}
                    />
                    <Stack
                        id={2}
                        cards={cards.filter((c) => c.boardPosition === 2)}
                        screenHeight={screenHeight}
                    />
                    <Stack
                        id={3}
                        cards={cards.filter((c) => c.boardPosition === 3)}
                        screenHeight={screenHeight}
                    />
                    <Stack
                        id={4}
                        cards={cards.filter((c) => c.boardPosition === 4)}
                        screenHeight={screenHeight}
                    />
                    <Stack
                        id={5}
                        cards={cards.filter((c) => c.boardPosition === 5)}
                        screenHeight={screenHeight}
                    />
                    <Stack
                        id={6}
                        cards={cards.filter((c) => c.boardPosition === 6)}
                        screenHeight={screenHeight}
                    />
                    <Stack
                        id={7}
                        cards={cards.filter((c) => c.boardPosition === 7)}
                        screenHeight={screenHeight}
                    />
                    <Stack
                        id={8}
                        cards={cards.filter((c) => c.boardPosition === 8)}
                        screenHeight={screenHeight}
                    />
                    <Stack
                        id={9}
                        cards={cards.filter((c) => c.boardPosition === 9)}
                        screenHeight={screenHeight}
                    />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <Stack
                        id={10}
                        cards={cards.filter((c) => c.boardPosition === 10)}
                        screenHeight={screenHeight}
                        spreadStyle="none"
                        handleCardClick={() => handleStockPileCardClick()}
                        hideLandingArea
                        title={`Stock: ${cards.filter((c) => c.boardPosition === 10).length}`}
                    />
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

export default Spider
