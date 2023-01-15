import { CSSProperties } from 'react';
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { CardInGame } from 'src/util/cards.util';
import Card from './Card';
import { StrictModeDroppable } from './StrictModeDroppable';

const getDraggedItemStyle = (isDragged: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined): CSSProperties => ({
    userSelect: 'none',  
    marginTop: isDragged ? '0' : '-3rem',
    ...draggableStyle,
});

const getTargetedStyle = (isTargetet: boolean): CSSProperties => ({
    background: isTargetet ? '#003153' : 'inherit',
});

const Stack = ({ id, cards }: { id: number; cards: CardInGame[] }) => {
    const stackCards = cards.sort((a, b) => a.stackPosition - b.stackPosition);
    return (
        <StrictModeDroppable droppableId={`${id}`}>
            {(provided, snapshot) => (
                <div
                    className="relative mt-12 h-72 rounded-md"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getTargetedStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                >
                    <div className="absolute w-full h-24 -mt-12 border-solid border-2 border-slate-50 rounded-md" style={getTargetedStyle(snapshot.isDraggingOver)}></div>
                    {stackCards.length > 0 && (
                        stackCards.map((c, index) => (!c.isPartOfDragging &&
                            <Draggable
                                key={c.suit + c.rank}
                                draggableId={c.suit + c.rank}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getDraggedItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                      )}>
                                        {
                                           stackCards.map((c2, ix2) => {
                                            return (ix2 === index || (c.isBeingDragged && ix2 > index)) &&
                                            <Card
                                                key={ix2}
                                                suit={c2.suit}
                                                rank={c2.rank}
                                            />
                                        })
                                        }
                                    </div>
                                )}
                            </Draggable>
                        ))
                    )}
                    {provided.placeholder}
                </div>
            )}
        </StrictModeDroppable>
    );
};

export default Stack;
