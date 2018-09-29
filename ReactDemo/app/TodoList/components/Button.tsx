import '@bootstrap-css';

import classNames from 'classnames';
import React from 'react';

export interface IButtonProps
{
    readonly active: boolean;
    readonly children: React.ReactNode;
    readonly onClick: () => void;
}

const Button = ({ active, children, onClick }: IButtonProps) =>
{
    const buttonClass = classNames('btn', 'btn-default', {
        active: active,
    });

    return (
        <button type="button" className={buttonClass} disabled={active} onClick={onClick}>
            {children}
        </button>
    );
};

export { Button };
