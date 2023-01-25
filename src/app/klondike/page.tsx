'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import Confetti from 'react-confetti';
import {
    CardInGame,
    CardPosition,
    getCards,
    gridGapXClass,
    gridGapYClass,
    gridMarginTopClasses,
    gridMaxWidthClasses,
    handleCardMovementEnd,
    handleCardMovementStart,
    handleStockPileClick,
} from 'src/utils/cards.util';
import Stack from 'src/components/stack/Stack';
import useScreenHeight from '@/utils/hooks/useScreenHeight';
import useScreenWidth from '@/utils/hooks/useScreenWidth';
import { isAllowedMove, isCompleted } from 'src/app/klondike/klondike.util';
import AlertModal from 'src/components/AlertModal';

const cardPositionSetup: CardPosition[] = Array.from(new Array(7), (_, i) => i)
    .map((_, i) =>
        Array.from(new Array(7 - i), (_, i2) => ({
            boardPosition: i2 + 7 + i,
            stackPosition: i,
            revealed: i2 === 0,
        }))
    )
    .flat();

const getSetup = (): CardInGame[] =>
    getCards().map((c, i) => {
        return cardPositionSetup[i]
            ? { ...c, ...cardPositionSetup[i] }
            : {
                  ...c,
                  boardPosition: 1,
                  stackPosition: i - cardPositionSetup.length,
              };
    });

const Klondike = () => {
    const [cards, setCards] = useState(getSetup());
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [completed, setCompleted] = useState(false);

    const screenHeight = useScreenHeight();
    const screenWidth = useScreenWidth();

    const handleOnDragStart = (start: DragStart) => {
        setCards(handleCardMovementStart(start, cards));
    };

    const handleOnDragEnd = (result: DropResult) => {
        setCards(
            handleCardMovementEnd(
                result,
                cards,
                isAllowedMove(result, cards, openModal)
            )
        );
    };

    useEffect(() => {
        if (isCompleted(cards)) {
            setCompleted(true);
        }
    }, [cards]);

    const handleStockPileCardClick = () => {
        setCards(handleStockPileClick(cards));
    };

    const openModal = (content: string) => {
        setModalContent(content);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <DragDropContext
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
        >
            <div
                id="cards"
                className={`cards items-end ${gridMaxWidthClasses[screenHeight]} mx-auto ${gridMarginTopClasses[screenHeight]} px-2 grid grid-rows-2 grid-cols-7 ${gridGapYClass[screenHeight]} ${gridGapXClass[screenWidth]}`}
            >
                <Stack
                    id={1}
                    cards={cards.filter((c) => c.boardPosition === 1)}
                    screenHeight={screenHeight}
                    spreadStyle="sm"
                    handleCardClick={() => handleStockPileCardClick()}
                ></Stack>
                <Stack
                    id={2}
                    cards={cards.filter((c) => c.boardPosition === 2)}
                    screenHeight={screenHeight}
                    spreadStyle="none"
                ></Stack>
                <div></div>
                <Stack
                    id={3}
                    cards={cards.filter((c) => c.boardPosition === 3)}
                    screenHeight={screenHeight}
                    spreadStyle="sm"
                ></Stack>
                <Stack
                    id={4}
                    cards={cards.filter((c) => c.boardPosition === 4)}
                    screenHeight={screenHeight}
                    spreadStyle="sm"
                ></Stack>
                <Stack
                    id={5}
                    cards={cards.filter((c) => c.boardPosition === 5)}
                    screenHeight={screenHeight}
                    spreadStyle="sm"
                ></Stack>
                <Stack
                    id={6}
                    cards={cards.filter((c) => c.boardPosition === 6)}
                    screenHeight={screenHeight}
                    spreadStyle="sm"
                ></Stack>
                <Stack
                    id={7}
                    cards={cards.filter((c) => c.boardPosition === 7)}
                    screenHeight={screenHeight}
                ></Stack>
                <Stack
                    id={8}
                    cards={cards.filter((c) => c.boardPosition === 8)}
                    screenHeight={screenHeight}
                ></Stack>
                <Stack
                    id={9}
                    cards={cards.filter((c) => c.boardPosition === 9)}
                    screenHeight={screenHeight}
                ></Stack>
                <Stack
                    id={10}
                    cards={cards.filter((c) => c.boardPosition === 10)}
                    screenHeight={screenHeight}
                ></Stack>
                <Stack
                    id={11}
                    cards={cards.filter((c) => c.boardPosition === 11)}
                    screenHeight={screenHeight}
                ></Stack>
                <Stack
                    id={12}
                    cards={cards.filter((c) => c.boardPosition === 12)}
                    screenHeight={screenHeight}
                ></Stack>
                <Stack
                    id={13}
                    cards={cards.filter((c) => c.boardPosition === 13)}
                    screenHeight={screenHeight}
                ></Stack>
            </div>
            <AlertModal
                isOpen={modalIsOpen}
                close={closeModal}
                content={modalContent}
            />
            {completed && <Confetti />}
        </DragDropContext>
    );
};

export default Klondike;
