import { connect } from 'react-redux';

import { ListSummary } from '../../components/TruckList/ListSummary';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    page: state.trucksList.request.page,
    pageSize: state.trucksList.request.pageSize,
    count: state.trucksList.response.filteredItems,
    isFiltered: state.trucksList.response.filteredItems < state.trucksList.response.totalItems,
});

const ListSummaryContainer = connect(mapStateToProps)(ListSummary);
export { ListSummaryContainer };
