import { CSSProperties } from 'react'
import { ScreenHeight } from 'src/utils/screen.util'
import {
    cardHeightClasses,
    CardInGame,
    cardMarginTopClasses,
    pileHeightClasses,
    SpreadStyle,
} from 'src/utils/cards.util'
import { StrictModeDroppable } from 'src/components/StrictModeDroppable'
import StackCards from 'src/components/stack/StackCards'

const getTargetedStyle = (isTargetet: boolean): CSSProperties => ({
    background: isTargetet
        ? 'linear-gradient(to bottom right, transparent, rgb(59 130 246)) rgb(147 51 234)'
        : '#15803D',
})

type StackProps = {
    id: number
    cards: CardInGame[]
    screenHeight: ScreenHeight
    spreadStyle?: SpreadStyle
    handleCardClick?: () => void
    hideLandingArea?: boolean
    title?: string
}

const Stack = ({
    id,
    cards,
    screenHeight,
    spreadStyle = 'md',
    handleCardClick,
    hideLandingArea = false,
    title,
}: StackProps) => {
    return (
        <StrictModeDroppable droppableId={`${id}`}>
            {(provided, snapshot) => (
                <div
                    className={`relative ${cardMarginTopClasses[screenHeight].base} ${pileHeightClasses[screenHeight][spreadStyle]} rounded-md`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={
                        hideLandingArea
                            ? { opacity: '100%' }
                            : getTargetedStyle(snapshot.isDraggingOver)
                    }
                    {...provided.droppableProps}>
                    {title && <div className="text-white mb-16">{title}</div>}
                    <div
                        className={`absolute w-full -${
                            cardMarginTopClasses[screenHeight].base
                        } ${cardHeightClasses[screenHeight]} ${
                            handleCardClick ? ' cursor-pointer' : ''
                        } p-0.5 mb-2 mr-2 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200`}
                        onClick={handleCardClick}>
                        <div
                            className="relative w-full h-full px-5 py-2.5 transition-all ease-in rounded-md"
                            style={getTargetedStyle(snapshot.isDraggingOver)}
                        />
                    </div>
                    <StackCards
                        cards={cards}
                        screenHeight={screenHeight}
                        spreadStyle={spreadStyle}
                        handleCardClick={handleCardClick}
                    />
                    {provided.placeholder}
                </div>
            )}
        </StrictModeDroppable>
    )
}

export default Stack
