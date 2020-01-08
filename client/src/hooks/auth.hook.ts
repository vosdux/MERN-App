import {useState, useCallback, useEffect} from 'react';

const storageName: string = 'userData';

export interface IUserInfo {
    login: (jwtToken: string|null, id: string|null) => void,
    logout: () => void, 
    token: string|null,
    userId: string|null,
    ready: boolean
}

export const useAuth = ():IUserInfo => {
    const [token, setToken] = useState<string|null>(null);
    const [ready, setReady] = useState<boolean>(false);
    const [userId, setUserId] = useState<string|null>(null);

    const login = useCallback((jwtToken: string|null, id: string|null) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(()=>{
        const data = localStorage.getItem(storageName)
        let parseData;
        if (data) {
            parseData = JSON.parse(data)
            if (parseData && parseData.token) {
                login(parseData.token, parseData.userId)
            }
        }
        setReady(true);
    }, [login])

    return { login, logout, token, userId, ready }
}