import { NavBar } from '@app/components/NavBar';
import { ILink, NavBarLink } from '@app/components/NavBarLink';
import { NavBarNav } from '@app/components/NavBarNav';
import React from 'react';

export { ILink } from '@app/components/NavBarLink';

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
