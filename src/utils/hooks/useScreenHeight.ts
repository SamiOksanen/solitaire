import { useEffect, useState } from 'react'
import { ScreenHeight, getScreenHeight } from 'src/utils/screen.util'

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
