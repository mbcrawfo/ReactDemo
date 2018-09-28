import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IFoodTruckState, ITruckRequest } from '@app/FoodTruck/state';
import { FoodTruckAction } from '@app/FoodTruck/reducers';
import { SortHeader } from '@app/components/SortHeader';
import { setTruckSort } from '@app/FoodTruck/actions';
import SortDirection from '@app/SortDirection';

interface IBoundSortHeaderProps
{
    readonly text: string;
    readonly sortName: ITruckRequest['sortName'];
    readonly initialSortDirection?: SortDirection;
}

const mapStateToProps = (state: IFoodTruckState, { sortName }: IBoundSortHeaderProps) => ({
    sortDirection: state.truckList.request.sortName === sortName
        ? state.truckList.request.sortDirection
        : null,
});

const mapDispatchToProps =
    (dispatch: Dispatch<FoodTruckAction>, { sortName }: IBoundSortHeaderProps) => ({
        setSortDirection: (sortDirection: SortDirection) =>
        {
            dispatch(setTruckSort(sortDirection, sortName));
        },
    });

type TSP = ReturnType<typeof mapStateToProps>;
type TDP = ReturnType<typeof mapDispatchToProps>;
const mergeProps = (
    { sortDirection }: TSP,
    { setSortDirection }: TDP,
    ownProps: IBoundSortHeaderProps) =>
({
    toggleSortDirection: () =>
    {
        let newSortDirection = ownProps.initialSortDirection || SortDirection.Asc;
        if (sortDirection !== null)
        {
            newSortDirection = sortDirection === SortDirection.Desc
                ? SortDirection.Asc
                : SortDirection.Desc;
        }

        setSortDirection(newSortDirection);
    },
    sortDirection,
    ...ownProps,
});

export const BoundSortHeader = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SortHeader);
