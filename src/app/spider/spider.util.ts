import { DropResult } from '@hello-pangea/dnd'
import {
    CardInGame,
    CardPosition,
    Suit,
    getCards,
    getMaxStackPosition,
    handleCardMovementEnd,
} from 'src/utils/cards.util'
import { hasSameSuit, isOneRankLower } from 'src/utils/validation.util'

const stockPilePosition = 10

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
            c.boardPosition === card.boardPosition &&
            c.stackPosition > card.stackPosition
    )
    for (const cardAbove of cardsAbove) {
        const cardBelow = cards.find(
            (cb) =>
                cardAbove.boardPosition === cb.boardPosition &&
                cardAbove.stackPosition - 1 === cb.stackPosition
        )
        if (
            !hasSameSuit(cardAbove, card) ||
            (cardBelow && !isOneRankLower(cardAbove, cardBelow))
        ) {
            return false
        }
    }
    return true
}

const clearFullStacks = (cards: CardInGame[]): CardInGame[] => {
    let suit: Suit | null = null
    let minStackPos: number | null = null
    let boardPos: number | null = null
    const tableauCards = cards.filter(
        (c) => c.boardPosition !== stockPilePosition
    )
    for (const c of tableauCards) {
        if (c.rank === 13) {
            const sameSuitCardsAbove = cards.filter(
                (c2) =>
                    c2.boardPosition === c.boardPosition &&
                    c2.stackPosition > c.stackPosition &&
                    hasSameSuit(c2, c)
            )
            if (sameSuitCardsAbove.length === 12) {
                const isInOrder = () => {
                    for (const cardAbove of sameSuitCardsAbove) {
                        const cardBelow = cards.find(
                            (cb) =>
                                cardAbove.boardPosition === cb.boardPosition &&
                                cardAbove.stackPosition - 1 === cb.stackPosition
                        )
                        if (
                            cardBelow &&
                            !isOneRankLower(cardAbove, cardBelow)
                        ) {
                            return false
                        }
                    }
                    return true
                }
                if (isInOrder()) {
                    suit = c.suit
                    minStackPos = c.stackPosition
                    boardPos = c.boardPosition
                    break
                }
            }
        }
    }
    if (suit && minStackPos !== null && boardPos !== null) {
        let i = 0
        while (i < cards.length) {
            if (
                cards[i].suit === suit &&
                cards[i].stackPosition >= minStackPos &&
                cards[i].boardPosition === boardPos
            ) {
                cards.splice(i, 1)
            } else {
                i++
            }
        }
    }
    return cards
}

export const getSetup = (): CardInGame[] =>
    getCards(2).map((c, i) => {
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
                  id: `10_${i - cardPositionSetup.length}`,
              }
    })

export const handleStockPileClick = (cards: CardInGame[]) => {
    const items = [...cards]
    const stockMaxPos = getMaxStackPosition(stockPilePosition, cards)
    if (stockMaxPos !== -1) {
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
            /*
            if (!hasSameSuit(firstDraggedCard, lastDestinationCard)) {
                openModal(
                    'Cannot move the card on top of a card that is not the same color of suit!'
                )
                return false
            }
            */
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
    const stockPileCards = cards.filter((c) => c.boardPosition === 10)
    if (stockPileCards.length > 0) {
        return true
    } else {
        const hasEmptyBoardPositions = [...Array(10).keys()].some(
            (p) => !cards.some((c) => c.boardPosition === p)
        )
        for (const c of cards) {
            if (
                c.boardPosition === stockPilePosition ||
                !c.revealed ||
                !isInSuitSequence(cards, c)
            ) {
                continue
            }
            const cardBelow = cards.find(
                (cb) =>
                    c.boardPosition === cb.boardPosition &&
                    c.stackPosition - 1 === cb.stackPosition
            )

            if (
                hasEmptyBoardPositions &&
                cardBelow &&
                (!cardBelow.revealed ||
                    !hasSameSuit(c, cardBelow) ||
                    !isOneRankLower(c, cardBelow))
            ) {
                console.log(c.suit, c.rank)
                return true
            }

            for (const c2 of cards) {
                if (
                    c2.revealed &&
                    c2.stackPosition ===
                        getMaxStackPosition(c2.boardPosition, cards) &&
                    c2.boardPosition !== stockPilePosition &&
                    (!cardBelow ||
                        (cardBelow &&
                            (!cardBelow.revealed ||
                                !hasSameSuit(c, cardBelow) ||
                                !isOneRankLower(c, cardBelow)))) &&
                    hasSameSuit(c, c2) &&
                    isOneRankLower(c, c2)
                ) {
                    console.log(c.suit, c.rank, c2.suit, c2.rank)
                    return true
                }
            }
        }
        return false
    }
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
