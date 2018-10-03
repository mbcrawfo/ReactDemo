import '@bootstrap-css';

import React from 'react';

import { NavBar } from './NavBar';
import { ILink, NavBarLink } from './NavBarLink';
import { NavBarNav } from './NavBarNav';

export { ILink } from './NavBarLink';

export interface ITopBarLinksProps
{
    readonly links: ReadonlyArray<ILink>;
}

const TopBarLinks = ({ links }: ITopBarLinksProps) =>
{
    const linkItems = links.map((link, index) => (
        <NavBarLink key={index} link={link} />
    ));

    return (
        <NavBar>
            <NavBarNav>
                {linkItems}
            </NavBarNav>
        </NavBar>
    );
};

export { TopBarLinks };
