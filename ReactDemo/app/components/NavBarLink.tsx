import React from 'react';

export interface Link
{
    text: string,
    url: string
};

export type NavBarLinkProps = {
    link: Link
};

export const NavBarLink = ({ link }: NavBarLinkProps) => (
    <li>
        <a href={link.url}>{link.text}</a>
    </li>
);

export default NavBarLink;