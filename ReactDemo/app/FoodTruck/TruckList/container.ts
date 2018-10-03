import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './actions';
import { ITruckListState } from './types';

export const mapStateToTruckListProps = (state: ITruckListState) => ({
    searchTerm: state.request.searchTerm,
    sort: state.request.sortDirection,
    sortName: state.request.sortName,
    loading: state.isLoading,
    visibleTrucks: state.response.currentPage,
    selectedTruckId: state.selectedTruckId,
    pageNumber: state.request.page,
    pageSize: state.request.pageSize,
    filteredTrucks: state.response.filteredItems,
    totalTrucks: state.response.totalItems,
    errorMessage: state.errorMessage,
});

export const mapDispatchToTruckListProps = (dispatch: Dispatch) => bindActionCreators({
    setSearchTerm: actions.setTruckSearch,
    setSort: actions.setTruckSort,
    setSelectedTruck: actions.setSelectedTruck,
    setPage: actions.setTruckPage,
}, dispatch);
