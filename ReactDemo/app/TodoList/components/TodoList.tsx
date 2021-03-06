import React from 'react';

import { ITodoListItem } from '../types';
import { Todo } from './Todo';

export interface ITodoListProps
{
    readonly items: ReadonlyArray<ITodoListItem>;
    readonly onItemClick: (id: number) => void;
}

const TodoList = ({ items: itemData, onItemClick }: ITodoListProps) =>
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

export { TodoList };
