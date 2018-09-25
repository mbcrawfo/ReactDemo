import React from 'react';

import Todo from './Todo';
import { ITodoListItem } from '@app/TodoList/state';

export interface ITodoListProps
{
    readonly items: ReadonlyArray<ITodoListItem>;
    readonly onItemClick: (id: number) => void;
}

export const TodoList = ({ items: itemData, onItemClick }: ITodoListProps) =>
{
    const items = itemData.map(item => (
        <Todo key={item.id} {...item} onClick={() => onItemClick(item.id)}/>
    ));

    if (items.length === 0)
    {
        return <p><em>No todo items.</em></p>;
    }

    return <ul>{items}</ul>;
};

export default TodoList;
