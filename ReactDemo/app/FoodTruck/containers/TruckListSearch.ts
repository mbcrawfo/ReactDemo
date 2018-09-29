import { SearchBox } from '@app/components/SearchBox';
import { setTruckSearch } from '@app/FoodTruck/actions';
import { IFoodTruckState } from '@app/FoodTruck/state';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapStateToProps = (state: IFoodTruckState) => ({
    currentTerm: state.truckList.request.searchTerm,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSearchTerm: bindActionCreators(setTruckSearch, dispatch),
});

const TruckListSearch = connect(mapStateToProps, mapDispatchToProps)(SearchBox);
export { TruckListSearch };
