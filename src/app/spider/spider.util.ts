import { DropResult } from '@hello-pangea/dnd'
import { ScreenHeight } from 'src/utils/screen.util'
import {
    Card,
    CardInGame,
    CardPosition,
    Rank,
    Suit,
    getCards,
    getMaxStackPosition,
    handleCardMovementEnd,
    shuffle,
} from 'src/utils/cards.util'
import { hasSameSuit, isOneRankLower } from 'src/utils/validation.util'

const stockPilePosition = 10

const getEasyModeCards = (): Card[] => {
    const suits: Suit[] = ['spades', 'hearts']
    const deckOfCards: Card[] = suits
        .map((suit) =>
            Array.from(new Array(13), (_, i) => i + 1).map((rank) => ({
                suit: suit,
                rank: rank as Rank,
            }))
        )
        .flat()

    return shuffle(
        deckOfCards.flatMap((i) => Array.from({ length: 4 }).fill(i) as Card[])
    )
}

const cardPositionSetup: CardPosition[] = [...Array(6).keys()]
    .map((i) =>
        Array.from(new Array(i === 5 ? 4 : 10), (_, i2) => ({
            boardPosition: i2,
            stackPosition: i,
            revealed: (i === 5 && i2 < 4) || (i === 4 && i2 >= 4),
        }))
    )
    .flat()

const isInSuitSequence = (cards: CardInGame[], card: CardInGame): boolean => {
    const cardsAbove = cards.filter(
        (c) =>
            c.revealed &&
            c.boardPosition === card.boardPosition &&
            c.stackPosition > card.stackPosition
    )
    const sourceAndCardsAbove = [card, ...cardsAbove]
    return cardsAbove.every((cardAbove) =>
        sourceAndCardsAbove.some(
            (cardBelow) =>
                cardAbove.boardPosition === cardBelow.boardPosition &&
                cardAbove.stackPosition - 1 === cardBelow.stackPosition &&
                hasSameSuit(cardAbove, card) &&
                isOneRankLower(cardAbove, cardBelow)
        )
    )
}

const clearFullStacks = (cards: CardInGame[]): CardInGame[] => {
    let suit: Suit | null = null
    let minStackPos: number | null = null
    let boardPos: number | null = null
    const revealedCards = cards.filter((c) => c.revealed)
    for (const c of revealedCards) {
        if (c.rank === 13) {
            const sameSuitCardsAbove = revealedCards.filter(
                (c2) =>
                    c2.boardPosition === c.boardPosition &&
                    c2.stackPosition > c.stackPosition &&
                    c2.stackPosition < c.stackPosition + 13 &&
                    hasSameSuit(c2, c)
            )
            const kingAndCardsAbove = [c, ...sameSuitCardsAbove]
            if (
                sameSuitCardsAbove.length === 12 &&
                sameSuitCardsAbove.every((cardAbove) =>
                    kingAndCardsAbove.some(
                        (cardBelow) =>
                            cardBelow.boardPosition ===
                                cardAbove.boardPosition &&
                            cardBelow.stackPosition ===
                                cardAbove.stackPosition - 1 &&
                            isOneRankLower(cardAbove, cardBelow)
                    )
                )
            ) {
                suit = c.suit
                minStackPos = c.stackPosition
                boardPos = c.boardPosition
                break
            }
        }
    }
    if (suit && minStackPos !== null && boardPos !== null) {
        return cards
            .filter(
                (c) =>
                    c.boardPosition !== boardPos ||
                    c.stackPosition < minStackPos ||
                    c.stackPosition > minStackPos + 12
            )
            .map((c) =>
                c.boardPosition === boardPos &&
                c.stackPosition === minStackPos - 1
                    ? { ...c, revealed: true }
                    : c
            )
    }
    return cards
}

export const getSetup = (easyMode = false): CardInGame[] => {
    const cards = easyMode ? getEasyModeCards() : getCards(2)
    return cards.map((c, i) => {
        return cardPositionSetup[i]
            ? {
                  ...c,
                  ...cardPositionSetup[i],
                  id: `${cardPositionSetup[i].boardPosition}_${cardPositionSetup[i].stackPosition}`,
              }
            : {
                  ...c,
                  boardPosition: 10,
                  stackPosition: i - cardPositionSetup.length,
                  revealed: false,
                  id: `10_${i - cardPositionSetup.length}`,
              }
    })
}

export const handleStockPileClick = (cards: CardInGame[]) => {
    const items = [...cards]
    if (getMaxStackPosition(stockPilePosition, cards) !== -1) {
        const stockPileCards = cards
            .filter((c) => c.boardPosition === stockPilePosition)
            .sort((a, b) => b.stackPosition - a.stackPosition)
        stockPileCards.forEach((c, ix) => {
            if (ix < 10) {
                const tableauMaxPos = getMaxStackPosition(ix, cards)
                c.boardPosition = ix
                c.stackPosition = tableauMaxPos + 1
                c.revealed = true
            }
        })
    }
    return items
}

export const isAllowedMove = (
    result: DropResult,
    cards: CardInGame[],
    openModal: (content: string) => void
): boolean => {
    const source = Number(result.source.droppableId)
    const destination = Number(result.destination?.droppableId)
    if (!result.destination || source === destination) {
        return false
    }
    if (source === stockPilePosition) {
        openModal('Cannot move cards from the stock pile!')
        return false
    }
    if (destination === stockPilePosition) {
        openModal('Cannot put cards to the stock pile!')
        return false
    }
    let firstDraggedCard: CardInGame | undefined
    let lastDestinationCard: CardInGame | undefined
    for (const c of cards) {
        if (
            c.boardPosition === source &&
            c.stackPosition === result.source.index
        ) {
            if (!c.revealed) {
                openModal('Cannot move card faced down!')
                return false
            }
            firstDraggedCard = c
        }
        if (
            c.boardPosition === destination &&
            c.stackPosition === getMaxStackPosition(destination, cards)
        ) {
            lastDestinationCard = c
        }
    }

    if (firstDraggedCard) {
        if (!isInSuitSequence(cards, firstDraggedCard)) {
            openModal('Cards must be in-suit sequences to be moved together!')
            return false
        }
        if (lastDestinationCard) {
            if (!isOneRankLower(firstDraggedCard, lastDestinationCard)) {
                openModal(
                    'Cannot move the card on top of a card that is not one rank greater!'
                )
                return false
            }
        }
    }
    return true
}

export const hasValidMovesLeft = (cards: CardInGame[]): boolean => {
    if (cards.some((c) => c.boardPosition === stockPilePosition)) {
        return true
    }
    // Can be moved to an empty board position to make card below playable
    if (
        [...Array(10).keys()].some(
            (p) => !cards.some((c) => c.boardPosition === p)
        )
    ) {
        return true
    }

    for (const c of cards) {
        if (!c.revealed || !isInSuitSequence(cards, c)) {
            continue
        }
        const cardBelow = cards.find(
            (cb) =>
                c.boardPosition === cb.boardPosition &&
                c.stackPosition - 1 === cb.stackPosition
        )
        const cardBelowNewPlayable =
            cardBelow &&
            (!cardBelow.revealed ||
                !hasSameSuit(c, cardBelow) ||
                !isOneRankLower(c, cardBelow))

        // Can be moved on top of a suit sequence card to make empty board position or to make card below playable
        for (const c2 of cards) {
            if (
                c2.revealed &&
                c2.stackPosition ===
                    getMaxStackPosition(c2.boardPosition, cards) &&
                (!cardBelow || cardBelowNewPlayable) &&
                hasSameSuit(c, c2) &&
                isOneRankLower(c, c2)
            ) {
                return true
            }
        }
    }
    return false
}

export const handleSpiderCardMovementEnd = (
    result: DropResult,
    cards: CardInGame[],
    isAllowed: boolean
): CardInGame[] => {
    if (isAllowed) {
        return clearFullStacks(handleCardMovementEnd(result, cards, isAllowed))
    } else {
        return handleCardMovementEnd(result, cards, isAllowed)
    }
}

export const isCompleted = (cards: CardInGame[]): boolean => {
    return cards.length === 0
}

export const pileHeightClasses: Record<ScreenHeight, string> = {
    xs: 'h-72',
    sm: 'h-88',
    md: 'h-96',
    lg: 'h-112',
    xl: 'h-136',
}
