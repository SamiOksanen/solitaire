'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import Confetti from 'react-confetti';
import {
    CardInGame,
    CardPosition,
    getCards,
    handleCardMovementEnd,
    handleCardMovementStart,
    handleStockPileClick,
} from 'src/utils/cards.util';
import Stack from 'src/components/stack/Stack';
import useScreenSize from 'src/utils/hooks/useScreenSize';
import { isAllowedMove, isCompleted } from './klondike.util';
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

    const screenSize = useScreenSize();

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

    let gridGapClass;
    if (screenSize === 'xs') {
        gridGapClass = 'gap-x-1';
    } else if (screenSize === 'sm') {
        gridGapClass = 'gap-x-2';
    } else {
        gridGapClass = 'gap-x-4';
    }

    return (
        <DragDropContext
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
        >
            <div
                id="cards"
                className={`cards max-w-6xl mx-auto px-2 grid grid-rows-2 grid-cols-7 ${gridGapClass}`}
            >
                <Stack
                    id={1}
                    cards={cards.filter((c) => c.boardPosition === 1)}
                    spreadStyle="sm"
                    handleCardClick={() => handleStockPileCardClick()}
                ></Stack>
                <Stack
                    id={2}
                    cards={cards.filter((c) => c.boardPosition === 2)}
                    spreadStyle="none"
                ></Stack>
                <div></div>
                <Stack
                    id={3}
                    cards={cards.filter((c) => c.boardPosition === 3)}
                    spreadStyle="sm"
                ></Stack>
                <Stack
                    id={4}
                    cards={cards.filter((c) => c.boardPosition === 4)}
                    spreadStyle="sm"
                ></Stack>
                <Stack
                    id={5}
                    cards={cards.filter((c) => c.boardPosition === 5)}
                    spreadStyle="sm"
                ></Stack>
                <Stack
                    id={6}
                    cards={cards.filter((c) => c.boardPosition === 6)}
                    spreadStyle="sm"
                ></Stack>
                <Stack
                    id={7}
                    cards={cards.filter((c) => c.boardPosition === 7)}
                ></Stack>
                <Stack
                    id={8}
                    cards={cards.filter((c) => c.boardPosition === 8)}
                ></Stack>
                <Stack
                    id={9}
                    cards={cards.filter((c) => c.boardPosition === 9)}
                ></Stack>
                <Stack
                    id={10}
                    cards={cards.filter((c) => c.boardPosition === 10)}
                ></Stack>
                <Stack
                    id={11}
                    cards={cards.filter((c) => c.boardPosition === 11)}
                ></Stack>
                <Stack
                    id={12}
                    cards={cards.filter((c) => c.boardPosition === 12)}
                ></Stack>
                <Stack
                    id={13}
                    cards={cards.filter((c) => c.boardPosition === 13)}
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
