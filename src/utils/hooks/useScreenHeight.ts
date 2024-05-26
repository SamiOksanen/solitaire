import { useEffect, useState } from 'react'

export type ScreenHeight = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const getScreenHeight = (): ScreenHeight => {
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
        if (window.innerHeight <= 762) {
            return 'xs'
        }
    }
    return 'sm'
}

const useScreenHeight = () => {
    const [screenHeight, setScreenHeight] = useState<ScreenHeight>('sm')
    const onHResize = () => setScreenHeight(getScreenHeight())

    useEffect(() => {
        setScreenHeight(getScreenHeight())
        window.addEventListener('resize', onHResize)
        return () => window.removeEventListener('resize', onHResize)
    }, [])

    return screenHeight
}

export default useScreenHeight
