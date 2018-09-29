import { setSelectedTruck } from '@app/FoodTruck/actions';
import { TruckList } from '@app/FoodTruck/components/TruckList';
import { FoodTruckAction } from '@app/FoodTruck/reducers';
import { IFoodTruckState } from '@app/FoodTruck/state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

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

const FilteredTruckList = connect(mapStateToProps, mapDispatchToProps)(TruckList);
export { FilteredTruckList };
