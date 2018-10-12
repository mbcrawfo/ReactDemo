import { ConfirmationModal } from '@app/components/ConfirmationModal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { confirmationModalActions } from './actions';
import { ConfirmationModalState } from './reducers';
import { StateSelector } from './types';

const mapStateToProps = ({ show, confirmationId, data }: ConfirmationModalState) => ({
    show,
    confirmationId,
    ...data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onAccept: confirmationModalActions.accept,
    onCancel: confirmationModalActions.cancel,
}, dispatch);

const mergeProps = (
    { confirmationId, acceptAction, cancelAction, ...stateProps }: ReturnType<typeof mapStateToProps>,
    { onAccept, onCancel, ...dispatchProps }: ReturnType<typeof mapDispatchToProps>,
    ownProps: any
) =>
({
    ...ownProps,
    ...dispatchProps,
    onAccept: () => onAccept(confirmationId, acceptAction),
    onCancel: () => onCancel(confirmationId, cancelAction),
    ...stateProps,
});

export const makeConfirmationModalContainer = <TRootState>(stateSelector: StateSelector<TRootState>) =>
{
    const wrappedMapStateToProps = (state: TRootState) => mapStateToProps(stateSelector(state));
    return connect(wrappedMapStateToProps, mapDispatchToProps, mergeProps)(ConfirmationModal);
};
