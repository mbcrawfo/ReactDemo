import React from 'react';
import '../bootstrap.less';

export type Link = {
    text: string,
    url: string
};

type Props = {
    link: Link
};

const NavBarLink = ({ link }: Props) => (
    <li>
        <a href={link.url}>{link.text}</a>
    </li>
);

export default NavBarLink;