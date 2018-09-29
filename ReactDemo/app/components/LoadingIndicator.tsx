import '@bootstrap-css';

import React from 'react';

export interface ILoadingIndicatorProps
{
    readonly show: boolean;
    readonly children: React.ReactNode;
}

const LoadingIndicator = ({ show, children }: ILoadingIndicatorProps) =>
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

export { LoadingIndicator };
