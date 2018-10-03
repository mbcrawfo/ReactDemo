import SortDirection from '@app/SortDirection';
import React from 'react';

export interface ISortHeaderProps
{
    readonly text: string;
    readonly sort: SortDirection | null;
    readonly initialSort?: SortDirection;
    readonly setSort: (sort: SortDirection) => void;
}

const SortHeader = ({
    text,
    sort,
    initialSort = SortDirection.Asc,
    setSort,
}: ISortHeaderProps) =>
{
    let sortIcon = '';
    let nextSort = initialSort;

    if (sort)
    {
        sortIcon = sort === SortDirection.Asc ? '▲' : '▼';
        nextSort = sort === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    }

    return (
        <h4 className="text-center" style={{ cursor: 'pointer' }} onClick={() => setSort(nextSort)}>
            {text} {sortIcon}
        </h4>
    );
};

export { SortHeader };
