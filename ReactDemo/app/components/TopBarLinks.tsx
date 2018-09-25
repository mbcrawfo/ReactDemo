import React from 'react';

import NavBar from './NavBar';
import NavBarNav from './NavBarNav';
import NavBarLink, { ILink } from './NavBarLink';

export { ILink } from './NavBarLink';

export interface ITopBarLinksProps
{
    readonly links: ReadonlyArray<ILink>;
}

export const TopBarLinks = ({ links }: ITopBarLinksProps) =>
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

export default TopBarLinks;
