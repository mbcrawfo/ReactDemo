import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as actions from '../actions';
import { TodoList } from '../components/TodoList';
import { ITodoListItem, ITodoState, TodoAction, VisibilityFilter } from '../types';

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
