import React from 'react';

export interface IListSummaryProps
{
    readonly page: number;
    readonly pageSize: number;
    readonly count: number;
    readonly isFiltered: boolean;
}

const ListSummary = ({page, pageSize, count, isFiltered}: IListSummaryProps) =>
{
    if (count === 0)
    {
        return <p>No trucks match your search</p>;
    }

    const firstItem = ((page - 1) * pageSize) + 1;
    const lastItem = Math.min(page * pageSize, count);

    return <p>Showing trucks {firstItem}-{lastItem} of {count}{isFiltered && ' (filtered)'}</p>;
};

export { ListSummary };
