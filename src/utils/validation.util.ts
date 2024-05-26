import { CardInGame } from 'src/utils/cards.util'

export const hasSameSuit = (source: CardInGame, target: CardInGame): boolean =>
    source.suit === target.suit

export const hasSameSuitColor = (
    source: CardInGame,
    target: CardInGame
): boolean =>
    ((source.suit === 'clubs' || source.suit === 'spades') &&
        (target.suit === 'clubs' || target.suit === 'spades')) ||
    ((source.suit === 'hearts' || source.suit === 'diamonds') &&
        (target.suit === 'hearts' || target.suit === 'diamonds'))

export const isOneRankLower = (
    source: CardInGame,
    target: CardInGame
): boolean => source.rank === target.rank - 1

export const isOneRankGreater = (
    source: CardInGame,
    target: CardInGame
): boolean => source.rank === target.rank + 1
