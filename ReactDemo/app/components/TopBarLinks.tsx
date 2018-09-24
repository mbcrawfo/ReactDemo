import React from 'react';

import NavBar from './NavBar';
import NavBarNav from './NavBarNav';
import NavBarLink, { Link } from './NavBarLink';

export { Link } from './NavBarLink';

export type TopBarLinksProps = {
    links: Array<Link>
};

export const TopBarLinks = ({ links }: TopBarLinksProps) =>
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