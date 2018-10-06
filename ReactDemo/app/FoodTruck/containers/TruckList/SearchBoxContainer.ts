import { SearchBox } from '@app/components/SearchBox';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { RootState } from '../../store';
import { actions } from '../../store/trucksList';

const mapStateToProps = (state: RootState) => ({
    currentTerm: state.trucksList.request.searchTerm,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setSearchTerm: actions.setSearch,
}, dispatch);

const SearchBoxContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBox);
export { SearchBoxContainer };
