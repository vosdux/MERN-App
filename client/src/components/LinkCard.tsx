import React, { FC } from 'react'
import { ILink } from '../modules/Create';

interface LinkProps {
    link: ILink
}

export const LinkCard: FC<LinkProps> = ({ link }) => {
    return (
        <div>
            <h2>Ссылка</h2>
            <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Количество кликов по ссылке: <strong>{link.cliks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}
