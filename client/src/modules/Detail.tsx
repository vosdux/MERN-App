import React, { FC, useState, useCallback, useContext, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';
import { ILink } from './Create';

export const Detail: FC = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [link, setLink] = useState<ILink|null>(null);
    const { id } = useParams();

    const getLink = useCallback(async () => {
        try {
            const fetched: ILink = await request(`http://localhost:5000/api/link/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (error) {}
    }, [token, id, request]);

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }
    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    );
}
