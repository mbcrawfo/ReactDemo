import React from 'react';

export interface ILink
{
    readonly text: string;
    readonly url: string;
}

export interface INavBarLinkProps
{
    readonly link: ILink;
}

export const NavBarLink = ({ link }: INavBarLinkProps) => (
    <li>
        <a href={link.url}>{link.text}</a>
    </li>
);

export default NavBarLink;
