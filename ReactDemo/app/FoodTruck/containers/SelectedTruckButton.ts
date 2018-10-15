import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '../store';
import { RootAction } from '../store/actions';

interface IOwnProps
{
    readonly actionCreator: (truckId: number) => RootAction;
}

const mapStateToProps = ({ selectedTruckId }: RootState) => ({
    disabled: selectedTruckId === null,
    selectedTruckId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });

const mergeProps = (
    { selectedTruckId, ...stateProps }: ReturnType<typeof mapStateToProps>,
    { dispatch }: ReturnType<typeof mapDispatchToProps>,
    { actionCreator, ...ownProps }: IOwnProps & Partial<Button.ButtonProps>
) =>
({
    ...ownProps,
    onClick: () => selectedTruckId && dispatch(actionCreator(selectedTruckId)),
    ...stateProps,
});

const SelectedTruckButton = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Button);
export { SelectedTruckButton };
