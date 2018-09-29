import * as actions from '@app/TodoList/actions';
import { Button } from '@app/TodoList/components/Button';
import { TodoAction } from '@app/TodoList/reducers';
import { ITodoState, VisibilityFilter } from '@app/TodoList/state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

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
