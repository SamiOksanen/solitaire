import { useEffect, useState } from 'react'
import { ScreenWidth, getScreenWidth } from 'src/utils/screen.util'

const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState<ScreenWidth>('md')
    const onWResize = () => setScreenWidth(getScreenWidth())

    useEffect(() => {
        setScreenWidth(getScreenWidth())
        window.addEventListener('resize', onWResize)
        return () => window.removeEventListener('resize', onWResize)
    }, [])

    return screenWidth
}

export default useScreenWidth
