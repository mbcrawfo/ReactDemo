import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { setTruckSearch } from '@app/FoodTruck/actions';
import { SearchBox } from '@app/components/SearchBox';
import { IFoodTruckState } from '@app/FoodTruck/state';

const mapStateToProps = (state: IFoodTruckState) => ({
    currentTerm: state.truckList.request.searchTerm,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSearchTerm: bindActionCreators(setTruckSearch, dispatch),
});

export const TruckListSearch = connect(mapStateToProps, mapDispatchToProps)(SearchBox);
