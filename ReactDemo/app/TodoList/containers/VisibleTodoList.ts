import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ITodoState, ITodoListItem, VisibilityFilter } from '@app/TodoList/state';
import * as actions from '@app/TodoList/actions';
import { TodoAction } from '@app/TodoList/reducers';
import TodoList from '@app/TodoList/components/TodoList';

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

export const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default VisibleTodoList;
