import React from 'react';

export interface ITruckListSummaryProps
{
    readonly page: number;
    readonly pageSize: number;
    readonly items: number;
    readonly filtered: boolean;
}

const TruckListSummary = ({page, pageSize, items, filtered}: ITruckListSummaryProps) =>
{
    if (items === 0)
    {
        return <p>No trucks match your search</p>;
    }

    const firstItem = ((page - 1) * pageSize) + 1;
    const lastItem = Math.min(page * pageSize, items);

    return <p>Showing trucks {firstItem}-{lastItem} of {items}{filtered && ' (filtered)'}</p>;
};

export { TruckListSummary };
