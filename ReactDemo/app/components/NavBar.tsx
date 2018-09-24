import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export type NavBarProps = {
    children: React.ReactNode
};

export const NavBar = ({ children }: NavBarProps) => (
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