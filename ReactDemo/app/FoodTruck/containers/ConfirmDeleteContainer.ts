import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ConfirmDelete } from '../components/ConfirmDelete';
import { actions, getSelectedTruck, RootState } from '../store';

const mapStateToProps = (state: RootState) => ({
    show: state.showConfirmDelete,
    truckName: (getSelectedTruck(state) || { name: '' }).name,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    confirm: actions.deleteSelectedTruck.confirm,
    cancel: actions.deleteSelectedTruck.cancel,
}, dispatch);

const ConfirmDeleteContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmDelete);
export { ConfirmDeleteContainer };
