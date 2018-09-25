import React from 'react';
import classNames from 'classnames';
import '@bootstrap-css';

export interface IButtonProps
{
    readonly active: boolean;
    readonly children: React.ReactNode;
    readonly onClick: () => void;
}

export const ButtonComponent = ({ active, children, onClick }: IButtonProps) =>
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

export default ButtonComponent;
