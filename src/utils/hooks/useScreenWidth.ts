import { useEffect, useState } from 'react';

export type ScreenWidth = 'xs' | 'sm' | 'md';

const getScreenWidth = (): ScreenWidth => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 480) {
            return 'xs';
        }
        if (window.innerWidth <= 700) {
            return 'sm';
        }
    }
    return 'md';
};

const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState<ScreenWidth>('md');
    const onWResize = () => setScreenWidth(getScreenWidth());

    useEffect(() => {
        setScreenWidth(getScreenWidth());
        window.addEventListener('resize', onWResize);
        return () => window.removeEventListener('resize', onWResize);
    }, []);

    return screenWidth;
};

export default useScreenWidth;
