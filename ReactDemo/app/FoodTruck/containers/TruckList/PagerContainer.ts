import { Pager } from '@app/components/Pager';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actions, RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    page: state.truckRequestParams.page,
    pageSize: state.truckRequestParams.pageSize,
    totalItems: state.truckPaging.trucksMatchingSearch,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setPage: actions.setTruckPage,
}, dispatch);

const PagerContainer = connect(mapStateToProps, mapDispatchToProps)(Pager);
export { PagerContainer };
