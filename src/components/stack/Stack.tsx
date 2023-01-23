import { CSSProperties } from 'react';
import {
    CardInGame,
    SpreadStyle,
    spreadStylePileHeightClasses,
} from 'src/utils/cards.util';
import { StrictModeDroppable } from 'src/components/StrictModeDroppable';
import StackCards from './StackCards';

const getTargetedStyle = (isTargetet: boolean): CSSProperties => ({
    background: isTargetet
        ? 'linear-gradient(to bottom right, transparent, rgb(59 130 246)) rgb(147 51 234)'
        : '#15803D',
});

type StackProps = {
    id: number;
    cards: CardInGame[];
    spreadStyle?: SpreadStyle;
    handleCardClick?: () => void;
};

const Stack = ({
    id,
    cards,
    spreadStyle = 'md',
    handleCardClick,
}: StackProps) => {
    return (
        <StrictModeDroppable droppableId={`${id}`}>
            {(provided, snapshot) => (
                <div
                    className={`relative mt-16 ${spreadStylePileHeightClasses[spreadStyle]} rounded-md`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getTargetedStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                >
                    <div
                        className={`absolute w-full -mt-16 h-24 ${
                            handleCardClick ? ' cursor-pointer' : ''
                        } p-0.5 mb-2 mr-2 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200`}
                        onClick={handleCardClick}
                    >
                        <div
                            className="relative w-full h-full px-5 py-2.5 transition-all ease-in rounded-md"
                            style={getTargetedStyle(snapshot.isDraggingOver)}
                        />
                    </div>
                    <StackCards
                        cards={cards}
                        spreadStyle={spreadStyle}
                        handleCardClick={handleCardClick}
                    />
                    {provided.placeholder}
                </div>
            )}
        </StrictModeDroppable>
    );
};

export default Stack;
