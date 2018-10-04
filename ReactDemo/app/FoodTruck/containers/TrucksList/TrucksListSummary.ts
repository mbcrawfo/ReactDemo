import { connect } from 'react-redux';

import { ListSummary } from '../../components/TrucksList/ListSummary';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    page: state.foodTrucks.request.page,
    pageSize: state.foodTrucks.request.pageSize,
    count: state.foodTrucks.response.filteredItems,
    isFiltered: state.foodTrucks.response.filteredItems < state.foodTrucks.response.totalItems,
});

const TrucksListSummary = connect(mapStateToProps)(ListSummary);
export { TrucksListSummary };
