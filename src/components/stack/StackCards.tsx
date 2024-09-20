import { CSSProperties } from 'react'
import { Draggable, DraggingStyle, NotDraggingStyle } from '@hello-pangea/dnd'
import { ScreenHeight } from 'src/utils/screen.util'
import {
    cardHeightClasses,
    CardInGame,
    cardMarginTopClasses,
    CardSpreadStyle,
    draggedCardMarginTop,
    SpreadStyle,
} from 'src/utils/cards.util'
import Card from 'src/components/Card'

type StackCardsProps = {
    cards: CardInGame[]
    screenHeight: ScreenHeight
    spreadStyle: SpreadStyle
    handleCardClick?: () => void
}

const getDraggedItemStyle = (
    isDragged: boolean,
    isDropAnimating: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
    screenHeight: ScreenHeight,
    spreadStyle: CardSpreadStyle
): CSSProperties => {
    let marginTop: string
    if (isDropAnimating) {
        marginTop = draggedCardMarginTop[screenHeight].base
    } else {
        marginTop = draggedCardMarginTop[screenHeight][spreadStyle]
    }
    return {
        userSelect: 'none',
        marginTop,
        filter: isDragged ? 'drop-shadow(.1rem .25rem .25rem #475569)' : 'none',
        ...draggableStyle,
    }
}

const StackCards = ({
    cards,
    screenHeight,
    spreadStyle,
    handleCardClick,
}: StackCardsProps) => {
    const stackCards = cards.sort((a, b) => a.stackPosition - b.stackPosition)
    return (
        <>
            {stackCards.length > 0 &&
                stackCards.map(
                    (c, index) =>
                        !c.isPartOfDragging && (
                            <Draggable
                                key={c.id}
                                draggableId={c.id}
                                index={index}>
                                {(provided, snapshot) => {
                                    let cardSpreadStyle: CardSpreadStyle
                                    if (index === 0) {
                                        cardSpreadStyle = 'base'
                                    } else if (
                                        (!c.revealed ||
                                            (index !== 0 &&
                                                !stackCards[index - 1]
                                                    .revealed)) &&
                                        spreadStyle === 'md'
                                    ) {
                                        cardSpreadStyle = 'sm'
                                    } else {
                                        cardSpreadStyle = spreadStyle
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
                                                screenHeight,
                                                cardSpreadStyle
                                            )}>
                                            {stackCards.map((c2, ix2) => {
                                                return (
                                                    (ix2 === index ||
                                                        (c.isBeingDragged &&
                                                            c2.isPartOfDragging &&
                                                            ix2 > index)) && (
                                                        <Card
                                                            key={c2.id}
                                                            suit={c2.suit}
                                                            rank={c2.rank}
                                                            revealed={
                                                                c2.revealed
                                                            }
                                                            additionalStyleClass={`${
                                                                cardHeightClasses[
                                                                    screenHeight
                                                                ]
                                                            } ${
                                                                c.isBeingDragged &&
                                                                c2.isPartOfDragging &&
                                                                ix2 > index
                                                                    ? `-${cardMarginTopClasses[screenHeight][spreadStyle]}`
                                                                    : ''
                                                            }`}
                                                            handleClick={
                                                                handleCardClick
                                                            }
                                                        />
                                                    )
                                                )
                                            })}
                                        </div>
                                    )
                                }}
                            </Draggable>
                        )
                )}
        </>
    )
}

export default StackCards
