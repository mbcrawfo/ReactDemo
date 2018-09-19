import React, { ReactNode } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

type Props = {
    children: ReactNode
};

export const NavBar = ({ children }: Props) => (
    <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>

            <div className="navbar-collapse collapse">
                {children}
            </div>
        </div>
    </div>
);

export default NavBar;