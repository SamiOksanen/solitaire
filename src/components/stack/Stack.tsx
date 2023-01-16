import { CSSProperties } from 'react';
import { CardInGame } from 'src/util/cards.util';
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
    spreadStyle?: 'small';
};

const Stack = ({ id, cards, spreadStyle }: StackProps) => {
    return (
        <StrictModeDroppable droppableId={`${id}`}>
            {(provided, snapshot) =>
                spreadStyle === 'small' ? (
                    <div
                        className="relative mt-22 h-72 rounded-md"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={getTargetedStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        <div className="absolute w-full h-24 -mt-22 p-0.5 mb-2 mr-2 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200">
                            <div
                                className="relative w-full h-full px-5 py-2.5 transition-all ease-in rounded-md"
                                style={getTargetedStyle(
                                    snapshot.isDraggingOver
                                )}
                            />
                        </div>
                        <StackCards cards={cards} spreadStyle={spreadStyle} />
                        {provided.placeholder}
                    </div>
                ) : (
                    <div
                        className="relative mt-12 h-72 rounded-md"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={getTargetedStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        <div className="absolute w-full h-24 -mt-12 p-0.5 mb-2 mr-2 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200">
                            <div
                                className="relative w-full h-full px-5 py-2.5 transition-all ease-in rounded-md"
                                style={getTargetedStyle(
                                    snapshot.isDraggingOver
                                )}
                            />
                        </div>
                        <StackCards cards={cards} spreadStyle={spreadStyle} />
                        {provided.placeholder}
                    </div>
                )
            }
        </StrictModeDroppable>
    );
};

export default Stack;
