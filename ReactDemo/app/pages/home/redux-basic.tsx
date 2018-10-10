import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, Dispatch } from 'redux';
import { createLogger } from 'redux-logger';
import { ActionType, createAction, getType, StateType } from 'typesafe-actions';

/**** ACTIONS ****/

// Actions define HOW the app's state may be changed.  We define action creator factory
// functions to reduce the boilerplate necessary to make actions, and to take advantage of
// action type checking (thanks to typesafe-actions).
const actions =
{
    // They may be a simple signal to take action...
    increment: createAction('incrementCount'),

    // ...or carry some data (a payload)
    advance: createAction('advanceCount',
        resolve => (amount: number) => resolve(amount)
    ),

    reset: createAction('resetCount'),
};

// The root action is the union of all possible actions in the app.
type RootAction = ActionType<typeof actions>;

/**** REDUCERS ****/

// Reducers take in a piece of the current state and an action.  They return the updated state as a
// result of applying the action.  They may also define the default value of the state.
// Important points:
// * They MUST always return the current state when it is unchanged.
// * They MUST always be pure functions.
// * When dealing with state objects, they MUST return a shallow copy of the state.  That is, create
//   a new object, copy all properties from the input state to the result, and alter any properties
//   that have changed.

const counterReducer = (state = 0, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.increment):
            // type T = typeof action;
            return state + 1;

        case getType(actions.advance):
            const { payload } = action;
            return state + payload;

        case getType(actions.reset):
            return 0;

        default:
            return state;
    }
};

const changeCountReducer = (state = 0, action: RootAction) =>
{
    switch (action.type)
    {
        case getType(actions.increment):
        case getType(actions.advance):
        case getType(actions.reset):
            return state + 1;

        default:
            return state;
    }
};

// We combine many reducers together to create one reducer function called by the store.
const rootReducer = combineReducers({
    counter: counterReducer,
    metaData: combineReducers({
        changeCount: changeCountReducer,
    }),
});

// The overall state of the app is determined by the shape of the reducer.
type RootState = StateType<typeof rootReducer>;

/**** COMPONENTS ****/

interface IComponentProps
{
    readonly counter: number;
    readonly changeCount: number;
    readonly increment: () => void;
    readonly advance: (amount: number) => void;
    readonly reset: () => void;
}

const Component = ({ counter, changeCount, increment, advance, reset }: IComponentProps) => (
    <React.Fragment>
        <p>Count: {counter}, Changes: {changeCount}</p>
        <button type="button" onClick={increment}>Increment</button>
        <button type="button" onClick={() => advance(5)}>Advance +5</button>
        <button type="button" onClick={() => advance(10)}>Advance +10</button>
        <button type="button" onClick={reset}>Reset</button>
    </React.Fragment>
);

/**** CONTAINERS ****/

// Containers bind presentational components to the store, providing them with props and allowing
// them to dispatch actions.  This is normally split into two functions:

// One to provide props derived from the store's state.
const mapStateToProps = (state: RootState) => ({
    counter: state.counter,
    changeCount: state.metaData.changeCount,
});

// Another to provide callback props that dispatch actions.
const mapDispatchToProps = (dispatch: Dispatch) => ({
    increment: () => dispatch(actions.increment()),
    advance: (amount: number) => dispatch(actions.advance(amount)),
    reset: () => dispatch(actions.reset()),
});

// NOTE: When dispatch props align directly with action creators, Redux provides the
// bindActionCreators helper that can be used to reduce the callback boilerplate above:
// const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
//     increment: actions.increment,
//     advance: actions.advance,
//     reset: actions.reset,
// }, dispatch);

// Higher Order Components are a React concept where a function takes in a component, makes a
// wrapper around it that provides some (or all) of its props, and returns the new wrapped component.
// HOC's that are bound to Redux are known as containers.
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

/**** PULL IT ALL TOGETHER... ****/

const store = createStore(
    rootReducer,
    applyMiddleware(createLogger())
);

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById('app')
);
