import { SortHeader } from '@app/components/SortHeader';
import { setTruckSort } from '@app/FoodTruck/actions';
import { FoodTruckAction } from '@app/FoodTruck/reducers';
import { IFoodTruckState, ITruckRequest } from '@app/FoodTruck/state';
import SortDirection from '@app/SortDirection';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface IBoundSortHeaderProps
{
    readonly sortName: ITruckRequest['sortName'];
    readonly initialSortDirection?: SortDirection;
}

const mapStateToProps = (state: IFoodTruckState, { sortName }: IBoundSortHeaderProps) => ({
    sortDirection: state.truckList.request.sortName === sortName
        ? state.truckList.request.sortDirection
        : null,
});

const mapDispatchToProps = (dispatch: Dispatch<FoodTruckAction>, { sortName }: IBoundSortHeaderProps) => ({
    setSortDirection: (sort: SortDirection) => dispatch(setTruckSort(sort, sortName)),
});

const mergeProps = ({ sortDirection }: ReturnType<typeof mapStateToProps>,
                    { setSortDirection }: ReturnType<typeof mapDispatchToProps>,
                    ownProps: IBoundSortHeaderProps) => ({
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

const TruckListSortHeader = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SortHeader);
export { TruckListSortHeader };
