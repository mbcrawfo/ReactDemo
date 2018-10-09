import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actions, RootState } from '../store';

const mapStateToProps = (state: RootState) => ({
    disabled: state.selectedTruckId === null,
    selectedTruckId: state.selectedTruckId,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    initiate: actions.deleteTruck.initiate,
}, dispatch);

type SP = ReturnType<typeof mapStateToProps>;
type DP = ReturnType<typeof mapDispatchToProps>;
const mergeProps = ({ selectedTruckId, ...stateProps }: SP, { initiate }: DP, ownProps: any) => ({
    ...ownProps,
    onClick: () => selectedTruckId && initiate(selectedTruckId),
    ...stateProps,
});

const DeleteButtonContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Button);
export { DeleteButtonContainer };
