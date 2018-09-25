import React from 'react';

import { AddTodo } from '@app/TodoList/containers/AddTodo';
import { VisibleTodoList } from '@app/TodoList/containers/VisibleTodoList';
import { Footer } from '@app/TodoList/components/Footer';

export const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default App;
