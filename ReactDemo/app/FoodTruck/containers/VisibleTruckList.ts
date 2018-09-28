import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IFoodTruckState } from '@app/FoodTruck/state';
import { TruckList } from '@app/FoodTruck/components/TruckList';
import { FoodTruckAction } from '@app/FoodTruck/reducers';
import { setSelectedTruck } from '@app/FoodTruck/actions';

const mapStateToProps = (state: IFoodTruckState) => ({
    selectedId: state.truckList.selectedTruckId,
    trucks: state.data.trucks.currentPage,
});

const mapDispatchToProps = (dispatch: Dispatch<FoodTruckAction>) => ({
    onTruckClick: (id: number) =>
    {
        dispatch(setSelectedTruck(id));
    },
});

export const VisibleTruckList = connect(mapStateToProps, mapDispatchToProps)(TruckList);
