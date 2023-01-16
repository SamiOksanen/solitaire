'use client';

import {
    CardInGame,
    CardPosition,
    getCards,
    getMaxStackPosition,
    handleCardMovementEnd,
    handleCardMovementStart,
    handleStockPileClick,
} from 'src/utils/cards.util';
import React, { useState } from 'react';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import Stack from 'src/components/stack/Stack';
import {
    hasDifferentSuitColor,
    isOneRankSmaller,
} from 'src/utils/validation.util';

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

    const isAllowedMove = (result: DropResult): boolean => {
        if (!result.destination) {
            return false;
        }
        let isAllowed = true;
        let firstDraggedCard: CardInGame | undefined;
        let lastDestinationCard: CardInGame | undefined;
        cards.forEach((c) => {
            if (
                c.boardPosition === Number(result.source.droppableId) &&
                c.stackPosition === result.source.index
            ) {
                if (!c.revealed) {
                    // todo: add alert
                    console.log('Cannot move card faced down!');
                    isAllowed = false;
                    return;
                }
                firstDraggedCard = c;
            }
            if (
                c.boardPosition === Number(result.destination?.droppableId) &&
                c.stackPosition ===
                    getMaxStackPosition(
                        Number(result.destination?.droppableId),
                        cards
                    )
            ) {
                lastDestinationCard = c;
            }
        });

        if (!isAllowed) {
            return false;
        }

        if (firstDraggedCard && lastDestinationCard) {
            if (!hasDifferentSuitColor(firstDraggedCard, lastDestinationCard)) {
                // todo: add alert
                console.log(
                    'Cannot move the card on top of a card that has the same color of suit!'
                );
                return false;
            }
            if (!isOneRankSmaller(firstDraggedCard, lastDestinationCard)) {
                // todo: add alert
                console.log(
                    'Cannot move the card on top of a card that is not one rank greater!'
                );
                return false;
            }
        }
        return true;
    };

    const handleOnDragStart = (start: DragStart) => {
        console.log('start', JSON.stringify(start));
        setCards(handleCardMovementStart(start, cards));
    };

    const handleOnDragEnd = (result: DropResult) => {
        console.log('result', JSON.stringify(result));
        if (isAllowedMove(result)) {
            setCards(handleCardMovementEnd(result, cards));
        }
    };

    const handleStockPileCardClick = () => {
        setCards(handleStockPileClick(cards));
    };

    return (
        <DragDropContext
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
        >
            <div className="cards p-2 grid grid-rows-2 grid-cols-7 gap-4">
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
                ></Stack>
                <Stack
                    id={4}
                    cards={cards.filter((c) => c.boardPosition === 4)}
                ></Stack>
                <Stack
                    id={5}
                    cards={cards.filter((c) => c.boardPosition === 5)}
                ></Stack>
                <Stack
                    id={6}
                    cards={cards.filter((c) => c.boardPosition === 6)}
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
        </DragDropContext>
    );
};

export default Klondike;
