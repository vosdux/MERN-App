import {useCallback} from 'react';

declare global {
    interface Window { M: any }
}

export const useMessage = () => {
    return useCallback((text: string | null) => {
        if (window.M && text) {
            window.M!.toast({ html: text })
        }
    }, [])
};