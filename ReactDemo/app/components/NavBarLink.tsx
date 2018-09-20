import React from 'react';

export type Link = {
    text: string,
    url: string
};

type Props = {
    link: Link
};

export const NavBarLink = ({ link }: Props) => (
    <li>
        <a href={link.url}>{link.text}</a>
    </li>
);

export default NavBarLink;