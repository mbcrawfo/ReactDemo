import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ITodoState, VisibilityFilter } from '@app/TodoList/state';
import * as actions from '@app/TodoList/actions';
import { TodoAction } from '@app/TodoList/reducers';
import ButtonComponent from '@app/TodoList/components/Button';

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

export const FilterButton = connect(mapStateToProps, mapDispatchToProps)(ButtonComponent);
export default FilterButton;
