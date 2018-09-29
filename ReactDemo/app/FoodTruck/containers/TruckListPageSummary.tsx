import { IFoodTruckState } from '@app/FoodTruck/state';
import React from 'react';
import { connect } from 'react-redux';

interface ISummaryProps
{
    readonly currentPage: number;
    readonly pageSize: number;
    readonly filteredItems: number;
    readonly totalItems: number;
}

const _Component = ({currentPage, pageSize, filteredItems, totalItems}: ISummaryProps) =>
{
    if (filteredItems === 0)
    {
        return <p>No trucks match your search</p>;
    }

    const firstItem = ((currentPage - 1) * pageSize) + 1;
    const lastItem = Math.min(currentPage * pageSize, filteredItems);
    const isFiltered = filteredItems < totalItems;

    return <p>Showing trucks {firstItem}-{lastItem} of {filteredItems}{isFiltered && ' (filtered)'}</p>;
};

const mapStateToProps = (state: IFoodTruckState) => ({
    currentPage: state.truckList.request.page,
    pageSize: state.truckList.request.pageSize,
    filteredItems: state.data.trucks.filteredItems,
    totalItems: state.data.trucks.totalItems,
});

const TruckListPageSummary = connect(mapStateToProps)(_Component);
export { TruckListPageSummary };
