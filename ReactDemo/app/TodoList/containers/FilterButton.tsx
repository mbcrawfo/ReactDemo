import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as actions from '../actions';
import { Button } from '../components/Button';
import { ITodoState, TodoAction, VisibilityFilter } from '../types';

export interface IFilterButtonProps
{
    readonly filter: VisibilityFilter;
}

const mapStateToProps = (state: ITodoState, ownProps: IFilterButtonProps) => ({
    active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch: Dispatch<TodoAction>, ownProps: IFilterButtonProps) => ({
    onClick: () =>
    {
        dispatch(actions.setVisibilityFilter(ownProps.filter));
    },
});

const FilterButton = connect(mapStateToProps, mapDispatchToProps)(Button);
export { FilterButton };
