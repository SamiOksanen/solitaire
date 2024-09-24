export type ScreenHeight = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const getScreenHeight = (): ScreenHeight => {
    if (typeof window !== 'undefined') {
        if (window.innerHeight >= 1000) {
            return 'xl'
        }
        if (window.innerHeight >= 900) {
            return 'lg'
        }
        if (window.innerHeight >= 842) {
            return 'md'
        }
        if (window.innerHeight >= 762) {
            return 'sm'
        }
    }
    return 'xs'
}

export type ScreenWidth = 'xs' | 'sm' | 'md'

export const getScreenWidth = (): ScreenWidth => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 480) {
            return 'xs'
        }
        if (window.innerWidth <= 700) {
            return 'sm'
        }
    }
    return 'md'
}
