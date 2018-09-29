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

const NavBarLink = ({ link }: INavBarLinkProps) => (
    <li>
        <a href={link.url}>{link.text}</a>
    </li>
);

export { NavBarLink };
