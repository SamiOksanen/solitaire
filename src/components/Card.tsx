import { Card, Suit } from 'src/util/cards.util';

const Card = ({ suit, rank }: Card) => {
    let suitSymbol: string = '';
    let color: 'text-black' | 'text-red-700' = 'text-black';
    switch (suit) {
        case 'clubs':
            suitSymbol = '♣️';
            break;
        case 'diamonds':
            suitSymbol = '♦️';
            color = 'text-red-700';
            break;
        case 'hearts':
            suitSymbol = '♥️';
            color = 'text-red-700';
            break;
        case 'spades':
            suitSymbol = '♠️';
            break;
    }
    return (
        <div
            className={`relative h-24 -mt-12 bg-slate-50 border-solid border rounded-md border-slate-700 ${color}`}
        >{`${suitSymbol} ${rank}`}</div>
    );
};

export default Card;
