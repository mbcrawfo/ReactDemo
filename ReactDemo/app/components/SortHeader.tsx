import React from 'react';

import SortDirection from '@app/SortDirection';

export interface ISortHeaderProps
{
    readonly text: string;
    readonly sortDirection: SortDirection | null;
    readonly toggleSortDirection: () => void;
}

export const SortHeader = ({ text, sortDirection, toggleSortDirection }: ISortHeaderProps) =>
{
    const sortIcon = sortDirection === null
        ? ''
        : sortDirection === SortDirection.Asc
            ? '▲'
            : '▼';

    return (
        <h4 className="text-center" style={{ cursor: 'pointer' }} onClick={toggleSortDirection}>
            {text} {sortIcon}
        </h4>
    );
};
