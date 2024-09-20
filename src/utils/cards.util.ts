import { DragStart, DropResult } from '@hello-pangea/dnd'
import { ScreenHeight, ScreenWidth } from 'src/utils/screen.util'

type Enumerate<
    N extends number,
    Acc extends number[] = [],
> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<
    Enumerate<T>,
    Enumerate<F>
>

export type SpreadStyle = 'none' | 'sm' | 'md'

export type CardSpreadStyle = 'base' | SpreadStyle

export type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades'

export type Rank = IntRange<1, 14>

export interface Card {
    suit: Suit
    rank: Rank
}

export interface CardPosition {
    boardPosition: number
    stackPosition: number
    revealed?: boolean
}

export interface CardInGame extends Card, CardPosition {
    id: string
    isBeingDragged?: boolean
    isPartOfDragging?: boolean
}

const suits: Suit[] = ['clubs', 'diamonds', 'hearts', 'spades']

const deckOfCards: Card[] = suits
    .map((suit) =>
        Array.from(new Array(13), (x, i) => i + 1).map((rank) => ({
            suit: suit,
            rank: rank as Rank,
        }))
    )
    .flat()

const shuffle = (array: Card[]) => {
    let currentIndex = array.length,
        randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}

export const gridMaxWidthClasses: Record<ScreenHeight, string> = {
    xs: 'max-w-4xl',
    sm: 'max-w-4xl',
    md: 'max-w-6xl',
    lg: 'max-w-6xl',
    xl: 'max-w-6xl',
}

export const gridMarginTopClasses: Record<ScreenHeight, string> = {
    xs: '-mt-22',
    sm: '-mt-22',
    md: '-mt-22',
    lg: '-mt-26',
    xl: '-mt-40',
}

export const cardHeightClasses: Record<ScreenHeight, string> = {
    xs: 'h-17',
    sm: 'h-17',
    md: 'h-24',
    lg: 'h-24',
    xl: 'h-24',
}

export const cardMarginTopClasses: Record<
    ScreenHeight,
    Record<CardSpreadStyle, string>
> = {
    xs: {
        base: 'mt-10',
        none: 'mt-17',
        sm: 'mt-15',
        md: 'mt-10',
    },
    sm: {
        base: 'mt-10',
        none: 'mt-17',
        sm: 'mt-15',
        md: 'mt-10',
    },
    md: {
        base: 'mt-16',
        none: 'mt-24',
        sm: 'mt-22',
        md: 'mt-16',
    },
    lg: {
        base: 'mt-16',
        none: 'mt-24',
        sm: 'mt-22',
        md: 'mt-16',
    },
    xl: {
        base: 'mt-16',
        none: 'mt-24',
        sm: 'mt-22',
        md: 'mt-16',
    },
}

export const draggedCardMarginTop: Record<
    ScreenHeight,
    Record<CardSpreadStyle, string>
> = {
    xs: {
        base: '-2.5rem',
        none: '-4.25rem',
        sm: '-3.75rem',
        md: '-2.5rem',
    },
    sm: {
        base: '-2.5rem',
        none: '-4.25rem',
        sm: '-3.75rem',
        md: '-2.5rem',
    },
    md: {
        base: '-4rem',
        none: '-6rem',
        sm: '-5.5rem',
        md: '-4rem',
    },
    lg: {
        base: '-4rem',
        none: '-6rem',
        sm: '-5.5rem',
        md: '-4rem',
    },
    xl: {
        base: '-4rem',
        none: '-6rem',
        sm: '-5.5rem',
        md: '-4rem',
    },
}

export const pileHeightClasses: Record<
    ScreenHeight,
    Record<SpreadStyle, string>
> = {
    xs: {
        none: 'h-73',
        sm: 'h-52',
        md: 'h-73',
    },
    sm: {
        none: 'h-73',
        sm: 'h-52',
        md: 'h-73',
    },
    md: {
        none: 'h-76',
        sm: 'h-54',
        md: 'h-76',
    },
    lg: {
        none: 'h-80',
        sm: 'h-54',
        md: 'h-80',
    },
    xl: {
        none: 'h-96',
        sm: 'h-54',
        md: 'h-96',
    },
}

export const gridGapXClass: Record<ScreenWidth, string> = {
    xs: 'gap-x-1',
    sm: 'gap-x-2',
    md: 'gap-x-4',
}

export const gridGapYClass: Record<ScreenHeight, string> = {
    xs: 'gap-y-4',
    sm: 'gap-y-6',
    md: 'gap-y-8',
    lg: 'gap-y-12',
    xl: 'gap-y-16',
}

export const getCards = (numOfDecs = 1): Card[] =>
    shuffle(
        deckOfCards.flatMap(
            (i) => Array.from({ length: numOfDecs }).fill(i) as Card[]
        )
    )

export const getMaxStackPosition = (
    boardPositionId: number,
    cards: CardInGame[]
): number =>
    Math.max(
        ...cards.map((c) =>
            c.boardPosition === boardPositionId ? c.stackPosition : -1
        )
    )

export const handleCardMovementStart = (
    start: DragStart,
    cards: CardInGame[]
): CardInGame[] => {
    const items = [...cards]
    const sourceCards = items.filter(
        (c) => c.boardPosition === Number(start.source.droppableId)
    )
    sourceCards.forEach((c) => {
        if (c.stackPosition > start.source.index) {
            c.isPartOfDragging = true
        } else {
            if (c.stackPosition === start.source.index) {
                c.isBeingDragged = true
            }
        }
    })
    return items
}

export const handleCardMovementEnd = (
    result: DropResult,
    cards: CardInGame[],
    isAllowed: boolean
): CardInGame[] => {
    const items = [...cards]
    const sourceCards = items.filter(
        (c) => c.boardPosition === Number(result.source.droppableId)
    )
    if (isAllowed) {
        const destinationMaxPosition = getMaxStackPosition(
            Number(result.destination?.droppableId),
            cards
        )

        sourceCards.forEach((c) => {
            if (c.stackPosition >= result.source.index) {
                c.boardPosition = Number(result.destination?.droppableId)
                c.stackPosition =
                    destinationMaxPosition +
                    c.stackPosition -
                    result.source.index +
                    1
                c.isBeingDragged = false
                c.isPartOfDragging = false
            } else {
                if (
                    c.stackPosition === result.source.index - 1 &&
                    !c.revealed
                ) {
                    c.revealed = true
                }
            }
        })
    } else {
        sourceCards.forEach((c) => {
            if (c.stackPosition >= result.source.index) {
                c.isBeingDragged = false
                c.isPartOfDragging = false
            }
        })
    }

    return items
}
