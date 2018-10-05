import { Pager } from '@app/components/Pager';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { RootState } from '../../store';
import { actions } from '../../store/trucksList';

const mapStateToProps = (state: RootState) => ({
    page: state.trucksList.request.page,
    pageSize: state.trucksList.request.pageSize,
    totalItems: state.trucksList.response.filteredItems,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setPage: actions.setPage,
}, dispatch);

const TrucksPager = connect(mapStateToProps, mapDispatchToProps)(Pager);
export { TrucksPager };
