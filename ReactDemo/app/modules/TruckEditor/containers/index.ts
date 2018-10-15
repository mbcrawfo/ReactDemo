import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { truckEditorActions } from '../actions';
import { TruckEditor } from '../components';
import { TruckEditorState } from '../reducers';
import { StateSelector } from '../types';

const mapStateToProps = ({ show, truckId }: TruckEditorState) => ({
    show,
    truckId,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    cancel: truckEditorActions.cancel,
}, dispatch);

const mergeProps = (
    { truckId, ...stateProps }: ReturnType<typeof mapStateToProps>,
    { cancel }: ReturnType<typeof mapDispatchToProps>
) =>
({
    cancel: () => truckId && cancel(truckId),
    ...stateProps,
});

export const makeTruckEditorContainer = <TRootState>(stateSelector: StateSelector<TRootState>) =>
{
    const wrappedMapStateToProps = (state: TRootState) => mapStateToProps(stateSelector(state));
    return connect(wrappedMapStateToProps, mapDispatchToProps, mergeProps)(TruckEditor);
};
