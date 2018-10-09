import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ConfirmDelete } from '../components/ConfirmDelete';
import { actions, getSelectedTruck, RootState } from '../store';

const getSelectedTruckName = (state: RootState) =>
{
    const truck = getSelectedTruck(state);
    return truck ? truck.name : null;
};

const mapStateToProps = (state: RootState) => ({
    show: state.showConfirmDelete,
    selectedTruckId: state.selectedTruckId,
    truckName: getSelectedTruckName(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    confirm: actions.deleteTruck.confirm,
    cancel: actions.deleteTruck.cancel,
}, dispatch);

type SP = ReturnType<typeof mapStateToProps>;
type DP = ReturnType<typeof mapDispatchToProps>;
const mergeProps = ({ selectedTruckId, ...stateProps }: SP, { confirm, cancel }: DP, ownProps: any) => ({
    ...ownProps,
    confirm: () => selectedTruckId && confirm(selectedTruckId),
    cancel: () => selectedTruckId && cancel(selectedTruckId),
    ...stateProps,
});

const ConfirmDeleteContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ConfirmDelete);
export { ConfirmDeleteContainer };
