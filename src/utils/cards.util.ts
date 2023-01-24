import { DragStart, DropResult } from 'react-beautiful-dnd';
import { ScreenHeight } from 'src/utils/hooks/useScreenHeight';
import { ScreenWidth } from 'src/utils/hooks/useScreenWidth';

type Enumerate<
    N extends number,
    Acc extends number[] = []
> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<
    Enumerate<T>,
    Enumerate<F>
>;

export type SpreadStyle = 'none' | 'sm' | 'md';

export type CardSpreadStyle = 'base' | SpreadStyle;

export type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades';

export interface Card {
    suit: Suit;
    rank: IntRange<1, 14>;
}

export interface CardPosition {
    boardPosition: number;
    stackPosition: number;
    revealed?: boolean;
}

export interface CardInGame extends Card, CardPosition {
    isBeingDragged?: boolean;
    isPartOfDragging?: boolean;
}

const suits: Suit[] = ['clubs', 'diamonds', 'hearts', 'spades'];

const deckOfCards: Card[] = suits
    .map((suit) =>
        Array.from(new Array(13), (x, i) => i + 1).map((rank) => ({
            suit: suit,
            rank: rank as IntRange<1, 14>,
        }))
    )
    .flat();

const shuffle = (array: Card[]) => {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

export const cardSpreadStyleMarginTopClasses: Record<CardSpreadStyle, string> =
    {
        base: 'mt-16',
        none: 'mt-24',
        sm: 'mt-22',
        md: 'mt-16',
    };

export const spreadStylePileHeightClasses: Record<SpreadStyle, string> = {
    none: 'h-54',
    sm: 'h-54',
    md: 'h-76',
};

export const gridGapXClass: Record<ScreenWidth, string> = {
    xs: 'gap-x-1',
    sm: 'gap-x-2',
    md: 'gap-x-4',
};

export const gridGapYClass: Record<ScreenHeight, string> = {
    sm: 'gap-y-4',
    md: 'gap-y-8',
    lg: 'gap-y-12',
    xl: 'gap-y-16',
};

export const getCards = (numOfDecs = 1): Card[] =>
    shuffle(
        deckOfCards.flatMap(
            (i) => Array.from({ length: numOfDecs }).fill(i) as Card[]
        )
    );

export const getMaxStackPosition = (
    boardPositionId: number,
    cards: CardInGame[]
): number =>
    Math.max(
        ...cards.map((c) =>
            c.boardPosition === boardPositionId ? c.stackPosition : -1
        )
    );

export const handleCardMovementStart = (
    start: DragStart,
    cards: CardInGame[]
): CardInGame[] => {
    const items = Array.from(cards);
    const sourceCards = items.filter(
        (c) => c.boardPosition === Number(start.source.droppableId)
    );
    sourceCards.forEach((c) => {
        if (c.stackPosition > start.source.index) {
            c.isPartOfDragging = true;
        } else {
            if (c.stackPosition === start.source.index) {
                c.isBeingDragged = true;
            }
        }
    });
    return items;
};

export const handleCardMovementEnd = (
    result: DropResult,
    cards: CardInGame[],
    isAllowed: boolean
): CardInGame[] => {
    const items = Array.from(cards);
    const sourceCards = items.filter(
        (c) => c.boardPosition === Number(result.source.droppableId)
    );
    if (isAllowed) {
        const destinationMaxPosition = getMaxStackPosition(
            Number(result.destination?.droppableId),
            cards
        );

        sourceCards.forEach((c) => {
            if (c.stackPosition >= result.source.index) {
                c.boardPosition = Number(result.destination?.droppableId);
                c.stackPosition =
                    destinationMaxPosition +
                    c.stackPosition -
                    result.source.index +
                    1;
                c.isBeingDragged = false;
                c.isPartOfDragging = false;
            } else {
                if (
                    c.stackPosition === result.source.index - 1 &&
                    !c.revealed
                ) {
                    c.revealed = true;
                }
            }
        });
    } else {
        sourceCards.forEach((c) => {
            if (c.stackPosition >= result.source.index) {
                c.isBeingDragged = false;
                c.isPartOfDragging = false;
            }
        });
    }

    return items;
};

export const handleStockPileClick = (
    cards: CardInGame[],
    stockPilePosition = 1,
    wastePilePosition = 2,
    cardsToWastePile = 3
) => {
    const items = Array.from(cards);
    const stockMaxPos = getMaxStackPosition(stockPilePosition, cards);
    const wasteMaxPos = getMaxStackPosition(wastePilePosition, cards);
    if (stockMaxPos === -1) {
        if (wasteMaxPos !== -1) {
            const wastePileCards = items.filter(
                (c) => c.boardPosition === wastePilePosition
            );
            wastePileCards.forEach((c) => {
                c.boardPosition = stockPilePosition;
                c.stackPosition = wasteMaxPos - c.stackPosition;
                c.revealed = false;
            });
        }
    } else {
        const stockPileCards = items.filter(
            (c) => c.boardPosition === stockPilePosition
        );
        stockPileCards.forEach((c) => {
            if (c.stackPosition + cardsToWastePile > stockMaxPos) {
                c.boardPosition = wastePilePosition;
                c.stackPosition =
                    wasteMaxPos + stockMaxPos - c.stackPosition + 1;
                c.revealed = true;
            }
        });
    }
    return items;
};
