import { SearchBox } from '@app/components/SearchBox';
import { setTruckSearch } from '@app/FoodTruck/actions';
import { FoodTruckAction } from '@app/FoodTruck/reducers';
import { IFoodTruckState } from '@app/FoodTruck/state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: IFoodTruckState) => ({
    currentTerm: state.truckList.request.searchTerm,
});

const mapDispatchToProps = (dispatch: Dispatch<FoodTruckAction>) => ({
    setSearchTerm: (term: string) => dispatch(setTruckSearch(term)),
});

const TruckListSearch = connect(mapStateToProps, mapDispatchToProps)(SearchBox);
export { TruckListSearch };
