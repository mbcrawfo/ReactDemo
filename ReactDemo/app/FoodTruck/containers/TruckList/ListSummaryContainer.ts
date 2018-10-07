import { connect } from 'react-redux';

import { ListSummary } from '../../components/TruckList/ListSummary';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    page: state.truckRequestParams.page,
    pageSize: state.truckRequestParams.pageSize,
    count: state.truckPaging.trucksMatchingSearch,
    isFiltered: state.truckPaging.trucksMatchingSearch < state.truckPaging.totalTrucks,
});

const ListSummaryContainer = connect(mapStateToProps)(ListSummary);
export { ListSummaryContainer };
