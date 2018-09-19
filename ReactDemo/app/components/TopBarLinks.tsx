import React from 'react';

import NavBar from './NavBar';
import NavBarNav from './NavBarNav';
import NavBarLink, { Link } from './NavBarLink';

export { Link } from './NavBarLink';

type Props = {
    links: Array<Link>
};

export const TopBarLinks = ({ links }: Props) =>
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