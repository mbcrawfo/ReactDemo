import { SearchBox } from '@app/components/SearchBox';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { RootState } from '../../store';
import { actions } from '../../store/Trucks';

const mapStateToProps = (state: RootState) => ({
    currentTerm: state.foodTrucks.request.searchTerm,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setSearchTerm: actions.setSearch,
}, dispatch);

const TrucksSearchBox = connect(mapStateToProps, mapDispatchToProps)(SearchBox);
export { TrucksSearchBox };
