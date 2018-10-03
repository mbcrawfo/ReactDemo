import '@bootstrap-css';

import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as actions from '../actions';
import { TodoAction } from '../types';

interface IAddTodoProps
{
    readonly dispatch: Dispatch<TodoAction>;
}

const _AddTodo = ({ dispatch }: IAddTodoProps) =>
{
    const inputRef = React.createRef<HTMLInputElement>();

    const onFormSubmit: React.FormEventHandler = e =>
    {
        e.preventDefault();

        const input = inputRef.current;
        if (!input || !input.value.trim())
        {
            return;
        }

        dispatch(actions.add(input.value));
        input.value = '';
    };

    return (
        <div>
            <form className="form-inline" onSubmit={onFormSubmit}>
                <div className="input-group">
                    <input ref={inputRef} className="form-control" type="text" />
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-primary">
                            Add Todo
                        </button>
                    </span>
                </div>
            </form>
        </div>
    );
};

const AddTodo = connect()(_AddTodo);
export { AddTodo };
