import { useEffect, useState } from 'react';

type ScreenSize = 'xs' | 'sm' | 'md';

const getScreenSize = (): ScreenSize => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth <= 460) {
            return 'xs';
        }
        if (window.innerWidth <= 700) {
            return 'sm';
        }
    }
    return 'md';
};

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState(getScreenSize());

    useEffect(() => {
        const onResize = () => {
            setScreenSize(getScreenSize());
        };

        typeof window !== 'undefined' &&
            window.addEventListener('resize', onResize);

        return () => {
            typeof window !== 'undefined' &&
                window.removeEventListener('resize', onResize);
        };
    }, []);

    return screenSize;
};

export default useScreenSize;
