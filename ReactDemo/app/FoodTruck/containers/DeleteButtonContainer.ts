import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actions, RootState } from '../store';

const mapStateToProps = ({ selectedTruckId }: RootState) => ({
    disabled: selectedTruckId === null,
    selectedTruckId,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    begin: actions.deleteTruck.begin,
}, dispatch);

const mergeProps = (
    { selectedTruckId, ...stateProps }: ReturnType<typeof mapStateToProps>,
    { begin }: ReturnType<typeof mapDispatchToProps>,
    ownProps: any
) =>
({
    ...ownProps,
    onClick: () => selectedTruckId && begin(selectedTruckId),
    ...stateProps,
});

const DeleteButtonContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Button);
export { DeleteButtonContainer };
