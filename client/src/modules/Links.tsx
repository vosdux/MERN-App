import React, { FC, useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { ILink } from './Create';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';

export const Links: FC = () => {
    const [links, setLinks] = useState<ILink[]>([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const fetched: ILink[] = await request('http://localhost:5000/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            console.log(fetched)
            setLinks(fetched)
        } catch (error) {}
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    );
}
