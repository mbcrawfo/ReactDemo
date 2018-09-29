import { Footer } from '@app/TodoList/components/Footer';
import { AddTodo } from '@app/TodoList/containers/AddTodo';
import { VisibleTodoList } from '@app/TodoList/containers/VisibleTodoList';
import React from 'react';

const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export { App };
