import { DropResult } from 'react-beautiful-dnd';
import { CardInGame, getMaxStackPosition } from 'src/utils/cards.util';
import {
    hasSameSuit,
    hasSameSuitColor,
    isOneRankGreater,
    isOneRankLower,
} from 'src/utils/validation.util';

const blockedSources = [1];
const blockedDestinations = [1, 2];
const foundations = [3, 4, 5, 6];

export const isAllowedMove = (
    result: DropResult,
    cards: CardInGame[]
): boolean => {
    if (!result.destination) {
        return false;
    }
    const source = Number(result.source.droppableId);
    if (blockedSources.includes(source)) {
        // todo: add alert
        console.log('Cannot move cards from the stock pile!');
        return false;
    }
    const destination = Number(result.destination.droppableId);
    if (blockedDestinations.includes(destination)) {
        // todo: add alert
        console.log('Cannot put cards to the stock pile or the waste pile!');
        return false;
    }
    let isAllowed = true;
    let firstDraggedCard: CardInGame | undefined;
    let lastDestinationCard: CardInGame | undefined;
    cards.forEach((c) => {
        if (
            c.boardPosition === source &&
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
            c.boardPosition === destination &&
            c.stackPosition === getMaxStackPosition(destination, cards)
        ) {
            lastDestinationCard = c;
        }
    });

    if (!isAllowed) {
        return false;
    }

    if (firstDraggedCard) {
        if (foundations.includes(destination)) {
            if (!lastDestinationCard) {
                if (firstDraggedCard.rank != 1) {
                    // todo: add alert
                    console.log(
                        'Foundation piles can only be started with an Ace!'
                    );
                    return false;
                }
            } else {
                if (!hasSameSuit(firstDraggedCard, lastDestinationCard)) {
                    // todo: add alert
                    console.log(
                        'Cannot move the card on top of a card on foundation pile that has different suit!'
                    );
                    return false;
                }
                if (!isOneRankGreater(firstDraggedCard, lastDestinationCard)) {
                    // todo: add alert
                    console.log(
                        'Cannot move the card on top of a foundation pile card that is not one rank lower!'
                    );
                    return false;
                }
            }
        } else {
            if (!lastDestinationCard) {
                if (firstDraggedCard.rank != 13) {
                    // todo: add alert
                    console.log(
                        'Empty tableau piles can only be started with a King!'
                    );
                    return false;
                }
            } else {
                if (hasSameSuitColor(firstDraggedCard, lastDestinationCard)) {
                    // todo: add alert
                    console.log(
                        'Cannot move the card on top of a card that has the same color of suit!'
                    );
                    return false;
                }
                if (!isOneRankLower(firstDraggedCard, lastDestinationCard)) {
                    // todo: add alert
                    console.log(
                        'Cannot move the card on top of a card that is not one rank greater!'
                    );
                    return false;
                }
            }
        }
    }
    return true;
};
