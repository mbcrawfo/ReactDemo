import { Pager } from '@app/components/Pager';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { RootState } from '../../store';
import { actions } from '../../store/Trucks';

const mapStateToProps = (state: RootState) => ({
    page: state.foodTrucks.request.page,
    pageSize: state.foodTrucks.request.pageSize,
    totalItems: state.foodTrucks.response.filteredItems,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setPage: actions.setPage,
}, dispatch);

const TrucksPager = connect(mapStateToProps, mapDispatchToProps)(Pager);
export { TrucksPager };
