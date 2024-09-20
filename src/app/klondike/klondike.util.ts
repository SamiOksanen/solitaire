import { DropResult } from '@hello-pangea/dnd'
import {
    CardInGame,
    CardPosition,
    getCards,
    getMaxStackPosition,
} from 'src/utils/cards.util'
import {
    hasSameSuit,
    hasSameSuitColor,
    isOneRankGreater,
    isOneRankLower,
} from 'src/utils/validation.util'

const blockedSources = [1]
const blockedDestinations = [1, 2]
const singleCardSource = [2]
const foundations = [3, 4, 5, 6]

const cardPositionSetup: CardPosition[] = [...Array(7).keys()]
    .map((i) =>
        Array.from(new Array(7 - i), (_, i2) => ({
            boardPosition: i2 + 7 + i,
            stackPosition: i,
            revealed: i2 === 0,
        }))
    )
    .flat()

export const getSetup = (): CardInGame[] =>
    getCards().map((c, i) => {
        return cardPositionSetup[i]
            ? {
                  ...c,
                  ...cardPositionSetup[i],
                  id: `${cardPositionSetup[i].boardPosition}_${cardPositionSetup[i].stackPosition}`,
              }
            : {
                  ...c,
                  boardPosition: 1,
                  stackPosition: i - cardPositionSetup.length,
                  id: `1_${i - cardPositionSetup.length}`,
              }
    })

export const handleStockPileClick = (
    cards: CardInGame[],
    cardsToWastePile = 3,
    stockPilePosition = 1,
    wastePilePosition = 2
) => {
    const items = [...cards]
    const stockMaxPos = getMaxStackPosition(stockPilePosition, cards)
    const wasteMaxPos = getMaxStackPosition(wastePilePosition, cards)
    if (stockMaxPos === -1) {
        if (wasteMaxPos !== -1) {
            const wastePileCards = items.filter(
                (c) => c.boardPosition === wastePilePosition
            )
            wastePileCards.forEach((c) => {
                c.boardPosition = stockPilePosition
                c.stackPosition = wasteMaxPos - c.stackPosition
                c.revealed = false
            })
        }
    } else {
        const stockPileCards = items
            .filter((c) => c.boardPosition === stockPilePosition)
            .sort((a, b) => b.stackPosition - a.stackPosition)
        stockPileCards.forEach((c, ix) => {
            if (ix < cardsToWastePile) {
                c.boardPosition = wastePilePosition
                c.stackPosition = wasteMaxPos + ix + 1
                c.revealed = true
            }
        })
    }
    return items
}

export const isAllowedMove = (
    result: DropResult,
    cards: CardInGame[],
    openModal: (content: string) => void,
    easyMode = false
): boolean => {
    const source = Number(result.source.droppableId)
    const destination = Number(result.destination?.droppableId)
    if (!result.destination || source === destination) {
        return false
    }
    if (blockedSources.includes(source)) {
        openModal('Cannot move cards from the stock pile!')
        return false
    }
    if (blockedDestinations.includes(destination)) {
        openModal('Cannot put cards to the stock pile or the waste pile!')
        return false
    }
    let firstDraggedCard: CardInGame | undefined
    let lastDestinationCard: CardInGame | undefined
    for (const c of cards) {
        if (c.boardPosition === source) {
            if (c.stackPosition === result.source.index) {
                if (!c.revealed) {
                    openModal('Cannot move card faced down!')
                    return false
                }
                firstDraggedCard = c
            } else {
                if (
                    singleCardSource.includes(source) &&
                    c.stackPosition > result.source.index
                ) {
                    openModal(
                        'Only one card at a time is allowed to be moved from this pile!'
                    )
                    return false
                }
            }
        }
        if (
            c.boardPosition === destination &&
            c.stackPosition === getMaxStackPosition(destination, cards)
        ) {
            lastDestinationCard = c
        }
    }

    if (firstDraggedCard) {
        if (foundations.includes(destination)) {
            if (!lastDestinationCard) {
                if (firstDraggedCard.rank != 1) {
                    openModal(
                        'Foundation piles can only be started with an Ace!'
                    )
                    return false
                }
            } else {
                if (!hasSameSuit(firstDraggedCard, lastDestinationCard)) {
                    openModal(
                        'Cannot move the card on top of a card on foundation pile that has different suit!'
                    )
                    return false
                }
                if (!isOneRankGreater(firstDraggedCard, lastDestinationCard)) {
                    openModal(
                        'Cannot move the card on top of a foundation pile card that is not one rank lower!'
                    )
                    return false
                }
            }
        } else {
            if (!lastDestinationCard) {
                if (firstDraggedCard.rank != 13 && !easyMode) {
                    openModal(
                        'Empty tableau piles can only be started with a King!'
                    )
                    return false
                }
            } else {
                if (hasSameSuitColor(firstDraggedCard, lastDestinationCard)) {
                    openModal(
                        'Cannot move the card on top of a card that has the same color of suit!'
                    )
                    return false
                }
                if (!isOneRankLower(firstDraggedCard, lastDestinationCard)) {
                    openModal(
                        'Cannot move the card on top of a card that is not one rank greater!'
                    )
                    return false
                }
            }
        }
    }
    return true
}

export const hasValidMovesLeft = (
    cards: CardInGame[],
    cardsFromStockToWaste = 3,
    easyMode = false
): boolean => {
    const stockPileCards = cards
        .filter((c) => c.boardPosition === 1)
        .sort((a, b) => b.stackPosition - a.stackPosition)
    const wastePileCards = cards
        .filter((c) => c.boardPosition === 2)
        .sort((a, b) => a.stackPosition - b.stackPosition)
    const allStockCards = [...wastePileCards, ...stockPileCards]
    const playableCurrentStockPileCards = stockPileCards.filter(
        (_, i) =>
            (i + 1) % cardsFromStockToWaste === 0 ||
            i + 1 === stockPileCards.length
    )
    const playableStockCards = [
        ...allStockCards.filter(
            (c, i) =>
                (i + 1) % cardsFromStockToWaste === 0 ||
                i + 1 === allStockCards.length ||
                (c.boardPosition === 2 &&
                    c.stackPosition ===
                        getMaxStackPosition(c.boardPosition, cards))
        ),
        ...playableCurrentStockPileCards,
    ]
    const hasEmptyBoardPositions = [7, 8, 9, 10, 11, 12, 13].some(
        (p) => !cards.some((c) => c.boardPosition === p)
    )
    for (const c of cards) {
        if (foundations.includes(c.boardPosition)) {
            continue
        }
        const cardBelow = cards.find(
            (cb) =>
                c.boardPosition === cb.boardPosition &&
                c.stackPosition - 1 === cb.stackPosition
        )
        const isPlayableStockCard = playableStockCards.some(
            (sc) =>
                c.boardPosition === sc.boardPosition &&
                c.stackPosition === sc.stackPosition
        )
        if (
            isPlayableStockCard ||
            (c.revealed &&
                !foundations.includes(c.boardPosition) &&
                !blockedDestinations.includes(c.boardPosition) &&
                (c.stackPosition ===
                    getMaxStackPosition(c.boardPosition, cards) ||
                    (cardBelow && !cardBelow.revealed) ||
                    (!cardBelow && c.rank !== 13)))
        ) {
            if (c.rank === 1) {
                return true
            }
            if (
                hasEmptyBoardPositions &&
                (c.rank === 13 || easyMode) &&
                ((cardBelow && !cardBelow.revealed) || isPlayableStockCard)
            ) {
                return true
            }
            for (const c2 of cards) {
                if (
                    c2.revealed &&
                    c2.stackPosition ===
                        getMaxStackPosition(c2.boardPosition, cards) &&
                    !blockedDestinations.includes(c2.boardPosition)
                ) {
                    if (foundations.includes(c2.boardPosition)) {
                        if (
                            (c.stackPosition ===
                                getMaxStackPosition(c.boardPosition, cards) ||
                                isPlayableStockCard) &&
                            hasSameSuit(c, c2) &&
                            isOneRankGreater(c, c2)
                        ) {
                            return true
                        }
                    } else {
                        if (
                            ((!cardBelow && c.rank !== 13) ||
                                (cardBelow && !cardBelow.revealed) ||
                                isPlayableStockCard) &&
                            !hasSameSuitColor(c, c2) &&
                            isOneRankLower(c, c2)
                        ) {
                            return true
                        }
                    }
                }
            }
        }
    }
    return false
}

export const isCompleted = (cards: CardInGame[]): boolean => {
    for (const f of foundations) {
        if (cards.filter((c) => c.boardPosition === f).length !== 13) {
            return false
        }
    }
    return true
}
