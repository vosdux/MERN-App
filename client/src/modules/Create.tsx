import React, { FC, useState, ChangeEvent, KeyboardEvent, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export interface ILink {
    cliks: number,
    code: string,
    date: string,
    from: string,
    owner: string,
    to: string,
    __v: number,
    _id: string
};

interface IData {
    link: ILink
};

export const Create: FC = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState<string>('');
    const {request} = useHttp();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const pressHandler = async  (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            try {
                const data: IData = await request('http://localhost:5000/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`});
                history.push(`/detail/${data.link._id}`)
            } catch (error) {}
        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2 pt-2">
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setLink(event.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    );
}
