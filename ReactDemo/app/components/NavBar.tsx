import '@bootstrap-css';

import React from 'react';

export interface INavBarProps
{
    readonly children: React.ReactNode;
}

const NavBar = ({ children }: INavBarProps) => (
    <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
            </div>

            <div className="navbar-collapse collapse">
                {children}
            </div>
        </div>
    </div>
);

export { NavBar };
