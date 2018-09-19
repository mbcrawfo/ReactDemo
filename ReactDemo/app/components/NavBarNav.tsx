import React, { ReactNode } from 'react';
import '../bootstrap.less';

type NavBarNavProps = {
    children: ReactNode
};

const NavBarNav = ({ children }: NavBarNavProps) => (
    <ul className='nav navbar-nav'>
        {children}
    </ul>
);

export default NavBarNav;