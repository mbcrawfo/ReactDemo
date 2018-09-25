import { ActionType, getType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { VisibilityFilter, ITodoState, ITodoListItem } from '@app/TodoList/state';
import * as actions from '@app/TodoList/actions';

export type TodoAction = ActionType<typeof actions>;

let nextTodoId = 1;

type itemListType = ITodoState['items'];
const itemListReducer = (state: itemListType = [], action: TodoAction): itemListType =>
{
    switch (action.type)
    {
        case getType(actions.add):
            const newItem: ITodoListItem = {
                id: nextTodoId++,
                text: action.payload,
                completed: false,
            };
            return [...state, newItem ];

        case getType(actions.toggle):
            return state.map(item =>
            {
                if (item.id !== action.payload)
                {
                    return item;
                }

                return {
                    ...item,
                    completed: !item.completed,
                };
            });

        default:
            return state;
    }
};

type filterType = ITodoState['visibilityFilter'];
const visibilityFilterReducer = (state: filterType = VisibilityFilter.Active, action: TodoAction): filterType =>
{
    switch (action.type)
    {
        case getType(actions.setVisibilityFilter):
            return action.payload;

        default:
            return state;
    }
};

export const todoApp =  combineReducers<ITodoState, TodoAction>({
    items: itemListReducer,
    visibilityFilter: visibilityFilterReducer,
});

export default todoApp;
