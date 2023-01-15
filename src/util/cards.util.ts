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

export type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades';

export interface Card {
    suit: Suit;
    rank: IntRange<1, 13>;
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
            rank: rank as IntRange<1, 13>,
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

export const getCards = (numOfDecs: number = 1): Card[] =>
    shuffle(
        deckOfCards.flatMap(
            (i) => Array.from({ length: numOfDecs }).fill(i) as Card[]
        )
    );
