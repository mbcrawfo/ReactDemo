import * as Actions from './actions';

export { TruckList, ITruckListProps } from './components/TruckList';
export { mapStateToTruckListProps, mapDispatchToTruckListProps } from './container';
export { truckListReducer } from './reducers';
export { TruckListAction, ITruckListState } from './types';

export const TruckListActions = Actions;
