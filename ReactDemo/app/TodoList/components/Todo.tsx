import React from 'react';

export interface ITodoProps
{
    readonly text: string;
    readonly completed: boolean;
    readonly onClick: React.MouseEventHandler;
}

const Todo = ({ text, completed, onClick }: ITodoProps) => (
    <li onClick={onClick} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
    </li>
);

export { Todo };
