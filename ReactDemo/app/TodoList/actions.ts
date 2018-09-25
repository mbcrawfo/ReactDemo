import { createAction } from 'typesafe-actions';

import { VisibilityFilter } from '@app/TodoList/state';

export const add = createAction('todo/add', resolve => {
    return (text: string) => resolve(text);
});

export const toggle = createAction('todo/toggle', resolve => {
    return (id: number) => resolve(id);
});

export const setVisibilityFilter = createAction('todo/setVisibilityFilter', resolve => {
    return (filter: VisibilityFilter) => resolve(filter);
});
