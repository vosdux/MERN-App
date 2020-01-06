import { createContext } from 'react';

const noop = () => {

}

interface IAuth {
    token: string|null,
    userId: string|null,
    login: any,
    logout: any,
    isAuthenticated?: boolean
}

export const AuthContext = createContext<IAuth>({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})