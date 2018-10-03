import * as actions from '@app/TodoList/actions';
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { ITodoListItem, ITodoState, TodoAction, VisibilityFilter } from './types';

let nextTodoId = 1;

const itemListReducer = (state: ReadonlyArray<ITodoListItem> = [], action: TodoAction) =>
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

const visibilityFilterReducer = (state = VisibilityFilter.Active, action: TodoAction) =>
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
