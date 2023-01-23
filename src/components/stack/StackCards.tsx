import {
    CardInGame,
    CardSpreadStyle,
    cardSpreadStyleMarginTopClasses,
    SpreadStyle,
} from 'src/utils/cards.util';
import { CSSProperties } from 'react';
import {
    Draggable,
    DraggingStyle,
    NotDraggingStyle,
} from 'react-beautiful-dnd';
import Card from 'src/components/Card';

type StackCardsProps = {
    cards: CardInGame[];
    spreadStyle?: SpreadStyle;
    handleCardClick?: () => void;
};

const getDraggedItemStyle = (
    isDragged: boolean,
    isDropAnimating: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
    spreadStyle: CardSpreadStyle
): CSSProperties => {
    let marginTop: string;
    if (isDropAnimating) {
        marginTop = '-4rem';
    } else if (spreadStyle === 'base') {
        marginTop = '-4rem';
    } else if (spreadStyle === 'none') {
        marginTop = '-6rem';
    } else if (spreadStyle === 'sm') {
        marginTop = '-5.5rem';
    } else {
        marginTop = '-4rem';
    }
    return {
        userSelect: 'none',
        marginTop,
        filter: isDragged ? 'drop-shadow(.1rem .25rem .25rem #475569)' : 'none',
        ...draggableStyle,
    };
};

const StackCards = ({
    cards,
    spreadStyle = 'md',
    handleCardClick,
}: StackCardsProps) => {
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
                                {(provided, snapshot) => {
                                    let cardSpreadStyle: CardSpreadStyle;
                                    if (index === 0) {
                                        cardSpreadStyle = 'base';
                                    } else if (
                                        (!c.revealed ||
                                            (index !== 0 &&
                                                !stackCards[index - 1]
                                                    .revealed)) &&
                                        spreadStyle === 'md'
                                    ) {
                                        cardSpreadStyle = 'sm';
                                    } else {
                                        cardSpreadStyle = spreadStyle;
                                    }
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getDraggedItemStyle(
                                                snapshot.isDragging,
                                                snapshot.isDropAnimating,
                                                provided.draggableProps.style,
                                                cardSpreadStyle
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
                                                            revealed={
                                                                c2.revealed
                                                            }
                                                            additionalStyleClass={
                                                                c.isBeingDragged &&
                                                                c2.isPartOfDragging &&
                                                                ix2 > index
                                                                    ? `-${cardSpreadStyleMarginTopClasses[spreadStyle]}`
                                                                    : ''
                                                            }
                                                            handleClick={
                                                                handleCardClick
                                                            }
                                                        />
                                                    )
                                                );
                                            })}
                                        </div>
                                    );
                                }}
                            </Draggable>
                        )
                )}
        </>
    );
};

export default StackCards;
