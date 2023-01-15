'use client';

import { CardInGame, CardPosition, getCards } from 'src/util/cards.util';
import React, { useState } from 'react';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import Stack from 'src/components/stack/Stack';

const cardPositionSetup: CardPosition[] = [
    { boardPosition: 7, stackPosition: 0, revealed: true },
    { boardPosition: 8, stackPosition: 0 },
    { boardPosition: 9, stackPosition: 0 },
    { boardPosition: 10, stackPosition: 0 },
    { boardPosition: 11, stackPosition: 0 },
    { boardPosition: 12, stackPosition: 0 },
    { boardPosition: 13, stackPosition: 0 },
    { boardPosition: 8, stackPosition: 1, revealed: true },
    { boardPosition: 9, stackPosition: 1 },
    { boardPosition: 10, stackPosition: 1 },
    { boardPosition: 11, stackPosition: 1 },
    { boardPosition: 12, stackPosition: 1 },
    { boardPosition: 13, stackPosition: 1 },
    { boardPosition: 9, stackPosition: 2, revealed: true },
    { boardPosition: 10, stackPosition: 2 },
    { boardPosition: 11, stackPosition: 2 },
    { boardPosition: 12, stackPosition: 2 },
    { boardPosition: 13, stackPosition: 2 },
    { boardPosition: 10, stackPosition: 3, revealed: true },
    { boardPosition: 11, stackPosition: 3 },
    { boardPosition: 12, stackPosition: 3 },
    { boardPosition: 13, stackPosition: 3 },
    { boardPosition: 11, stackPosition: 4, revealed: true },
    { boardPosition: 12, stackPosition: 4 },
    { boardPosition: 13, stackPosition: 4 },
    { boardPosition: 12, stackPosition: 5, revealed: true },
    { boardPosition: 13, stackPosition: 5 },
    { boardPosition: 13, stackPosition: 6, revealed: true },
];

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
    const [cards, updateCards] = useState(getSetup());

    const handleOnDragStart = (start: DragStart) => {
        console.log('start', JSON.stringify(start));
        const items = Array.from(cards);
        const newCards = items.map((c) => {
            if (
                c.boardPosition === Number(start.source.droppableId) &&
                c.stackPosition > start.source!.index
            ) {
                return {
                    ...c,
                    isPartOfDragging: true,
                };
            }
            if (
                c.boardPosition === Number(start.source.droppableId) &&
                c.stackPosition === start.source!.index
            ) {
                return {
                    ...c,
                    isBeingDragged: true,
                };
            }
            return c;
        });
        updateCards(newCards);
    };

    const handleOnDragEnd = (result: DropResult) => {
        console.log('result', JSON.stringify(result));
        if (result.destination) {
            const items = Array.from(cards);
            const destinationMaxPosition = Math.max(
                ...cards.map((c) =>
                    c.boardPosition === Number(result.destination!.droppableId)
                        ? c.stackPosition
                        : -1
                )
            );
            const newCards = items.map((c) => {
                if (
                    (c.boardPosition === Number(result.source.droppableId) ||
                        c.boardPosition === 14) &&
                    c.stackPosition >= result.source!.index
                ) {
                    return {
                        ...c,
                        boardPosition: Number(result.destination!.droppableId),
                        stackPosition:
                            destinationMaxPosition +
                            c.stackPosition -
                            result.source!.index +
                            1,
                        isBeingDragged: false,
                        isPartOfDragging: false,
                    };
                }
                return c;
            }) as CardInGame[];
            updateCards(newCards);
        }
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
                    spreadStyle="small"
                ></Stack>
                <Stack
                    id={2}
                    cards={cards.filter((c) => c.boardPosition === 2)}
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
