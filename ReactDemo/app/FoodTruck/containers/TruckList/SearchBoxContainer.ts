import { SearchBox } from '@app/components/SearchBox';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actions, RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    currentTerm: state.truckRequestParams.searchTerm,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setSearchTerm: actions.searchTrucks,
}, dispatch);

const SearchBoxContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBox);
export { SearchBoxContainer };
