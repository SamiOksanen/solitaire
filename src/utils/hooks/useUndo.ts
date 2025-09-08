import { useState, useCallback } from 'react'
import { CardInGame } from 'src/utils/cards.util'

interface UndoState {
    cards: CardInGame[]
    canUndo: boolean
    saveState: (cards: CardInGame[]) => void
    undo: () => CardInGame[]
    clearHistory: () => void
}

export const useUndo = (initialCards: CardInGame[]): UndoState => {
    const [previousState, setPreviousState] = useState<CardInGame[] | null>(
        null
    )

    const saveState = useCallback((cards: CardInGame[]) => {
        // Deep copy using more efficient method than JSON.parse(JSON.stringify())
        const deepCopy = cards.map((card) => ({
            ...card,
        }))
        setPreviousState(deepCopy)
    }, [])

    const undo = useCallback((): CardInGame[] => {
        if (previousState) {
            const stateToRestore = previousState
            setPreviousState(null) // Clear the previous state after undo
            return stateToRestore
        }
        return initialCards // Fallback to initial cards if no previous state
    }, [previousState, initialCards])

    const clearHistory = useCallback(() => {
        setPreviousState(null)
    }, [])

    return {
        cards: initialCards,
        canUndo: previousState !== null,
        saveState,
        undo,
        clearHistory,
    }
}
