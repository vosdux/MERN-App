import React, { FC, useState, ChangeEvent, useEffect, useContext } from 'react';
import {useHttp} from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

interface IForm {
    email: string,
    password: string
}

export const Auth: FC = () => {
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState<IForm>({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (error) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId);
        } catch (error) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите email"
                                    id="email" 
                                    type="text"
                                    name="email" 
                                    className="input-yellow"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password" 
                                    type="password" 
                                    name="password" 
                                    className="input-yellow"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4 mr-1"
                            disabled={loading}
                            onClick={loginHandler}
                        >Войти</button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}    
                        >Зарегестрироваться</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
