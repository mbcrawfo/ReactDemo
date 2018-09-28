import React from 'react';
import '@bootstrap-css';

export interface ILoadingIndicatorProps
{
    readonly show: boolean;
    readonly children: React.ReactNode;
}

export const LoadingIndicator = ({ show, children }: ILoadingIndicatorProps) =>
{
    if (show)
    {
        return (
            <h3 className="text-center">
                <em>Loading...</em>
            </h3>
        );
    }

    return React.Children.only(children);
};
