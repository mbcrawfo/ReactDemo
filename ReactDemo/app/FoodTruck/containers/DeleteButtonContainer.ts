import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actions, RootState } from '../store';

const mapStateToProps = (state: RootState) => ({
    disabled: state.selectedTruckId === null,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onClick: actions.deleteTruck.request,
}, dispatch);

const DeleteButtonContainer = connect(mapStateToProps, mapDispatchToProps)(Button);
export { DeleteButtonContainer };
