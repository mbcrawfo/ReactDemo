import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ConfirmationModal } from './component';
import { ConfirmationModalState } from './reducers';
import { StateSelector } from './types';

const mapStateToProps = ({ show, data }: ConfirmationModalState) => ({
    show,
    ...data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });

const mergeProps = (
    { acceptAction, cancelAction, ...stateProps }: ReturnType<typeof mapStateToProps>,
    { dispatch }: ReturnType<typeof mapDispatchToProps>
) =>
({
    onAccept: () => dispatch(acceptAction),
    onCancel: () => dispatch(cancelAction),
    ...stateProps,
});

export const makeConfirmationModalContainer = <TRootState>(stateSelector: StateSelector<TRootState>) =>
{
    const wrappedMapStateToProps = (state: TRootState) => mapStateToProps(stateSelector(state));
    return connect(wrappedMapStateToProps, mapDispatchToProps, mergeProps)(ConfirmationModal);
};
