import * as actions from '@app/TodoList/actions';
import { TodoList } from '@app/TodoList/components/TodoList';
import { TodoAction } from '@app/TodoList/reducers';
import { ITodoListItem, ITodoState, VisibilityFilter } from '@app/TodoList/state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const getVisibleItems = (items: ReadonlyArray<ITodoListItem>, filter: VisibilityFilter)  =>
{
    switch (filter)
    {
        case VisibilityFilter.Active:
            return items.filter(i => !i.completed);

        case VisibilityFilter.Completed:
            return items.filter(i => i.completed);

        case VisibilityFilter.All:
        default:
            return items;
    }
};

const mapStateToProps = (state: ITodoState) => ({
    items: getVisibleItems(state.items, state.visibilityFilter),
});

const mapDispatchToProps = (dispatch: Dispatch<TodoAction>) => ({
    onItemClick: (id: number) =>
    {
        dispatch(actions.toggle(id));
    },
});

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export { VisibleTodoList };
