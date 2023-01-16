import { CardInGame } from 'src/util/cards.util';
import { CSSProperties } from 'react';
import {
    Draggable,
    DraggingStyle,
    NotDraggingStyle,
} from 'react-beautiful-dnd';
import Card from 'src/components/Card';

type StackCardsProps = {
    cards: CardInGame[];
    spreadStyle?: 'small';
};

const getDraggedItemStyle = (
    isDragged: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
    spreadStyle?: 'small'
): CSSProperties => ({
    userSelect: 'none',
    marginTop: isDragged ? '0' : spreadStyle === 'small' ? '-5rem' : '-3rem',
    filter: isDragged ? 'drop-shadow(.1rem .25rem .25rem #475569)' : 'none',
    ...draggableStyle,
});

const StackCards = ({ cards, spreadStyle }: StackCardsProps) => {
    const stackCards = cards.sort((a, b) => a.stackPosition - b.stackPosition);
    return (
        <>
            {stackCards.length > 0 &&
                stackCards.map(
                    (c, index) =>
                        !c.isPartOfDragging && (
                            <Draggable
                                key={`${c.suit}${c.rank}`}
                                draggableId={`${c.suit}${c.rank}`}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getDraggedItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            spreadStyle
                                        )}
                                    >
                                        {stackCards.map((c2, ix2) => {
                                            return (
                                                (ix2 === index ||
                                                    (c.isBeingDragged &&
                                                        c2.isPartOfDragging &&
                                                        ix2 > index)) && (
                                                    <Card
                                                        key={ix2}
                                                        suit={c2.suit}
                                                        rank={c2.rank}
                                                        revealed={c2.revealed}
                                                        spreadStyle={
                                                            spreadStyle
                                                        }
                                                    />
                                                )
                                            );
                                        })}
                                    </div>
                                )}
                            </Draggable>
                        )
                )}
        </>
    );
};

export default StackCards;
