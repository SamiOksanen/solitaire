import { CardInGame } from './cards.util';

export const hasDifferentSuitColor = (
    source: CardInGame,
    target: CardInGame
): boolean =>
    ((source.suit === 'clubs' || source.suit === 'spades') &&
        (target.suit === 'hearts' || target.suit === 'diamonds')) ||
    ((source.suit === 'hearts' || source.suit === 'diamonds') &&
        (target.suit === 'clubs' || target.suit === 'spades'));

export const isOneRankSmaller = (
    source: CardInGame,
    target: CardInGame
): boolean => source.rank === target.rank - 1;
