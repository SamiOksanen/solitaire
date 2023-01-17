import {
    IntRange,
    SpreadStyle,
    spreadStyleMarginTopClasses,
    Suit,
} from 'src/utils/cards.util';

type CardProps = {
    suit: Suit;
    rank: IntRange<1, 13>;
    revealed?: boolean;
    spreadStyle?: SpreadStyle;
    handleClick?: () => void;
};

const Card = ({
    suit,
    rank,
    revealed,
    spreadStyle = 'md',
    handleClick,
}: CardProps) => {
    let suitSymbol = '';
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

    const content = revealed ? (
        `${suitSymbol} ${rank}`
    ) : (
        <div className="w-full h-full rounded-md bg-white p-1">
            <div
                className="bg-repeat w-full h-full rounded-sm border border-solid border-black"
                style={{ backgroundImage: 'url("/red-bg-white-cross-29.png")' }}
            ></div>
        </div>
    );

    return (
        <div
            className={`relative h-24 -${spreadStyleMarginTopClasses[spreadStyle]} bg-slate-50 border-solid border rounded-md border-slate-700 ${color}`}
            onClick={() => handleClick && handleClick()}
        >
            {content}
        </div>
    );
};

export default Card;
