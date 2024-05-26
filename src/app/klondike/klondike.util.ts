import { DropResult } from 'react-beautiful-dnd'
import { CardInGame, getMaxStackPosition } from 'src/utils/cards.util'
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

export const isAllowedMove = (
    result: DropResult,
    cards: CardInGame[],
    openModal: (content: string) => void
): boolean => {
    if (!result.destination) {
        return false
    }
    const source = Number(result.source.droppableId)
    const destination = Number(result.destination.droppableId)
    if (source === destination) {
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
    let isAllowed = true
    let firstDraggedCard: CardInGame | undefined
    let lastDestinationCard: CardInGame | undefined
    cards.forEach((c) => {
        if (c.boardPosition === source) {
            if (c.stackPosition === result.source.index) {
                if (!c.revealed) {
                    openModal('Cannot move card faced down!')
                    isAllowed = false
                    return
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
                    isAllowed = false
                    return
                }
            }
        }
        if (
            c.boardPosition === destination &&
            c.stackPosition === getMaxStackPosition(destination, cards)
        ) {
            lastDestinationCard = c
        }
    })

    if (!isAllowed) {
        return false
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
                if (firstDraggedCard.rank != 13) {
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

export const isCompleted = (cards: CardInGame[]): boolean => {
    let completed = true
    foundations.forEach((f) => {
        if (cards.filter((c) => c.boardPosition === f).length !== 13) {
            completed = false
        }
    })
    return completed
}
