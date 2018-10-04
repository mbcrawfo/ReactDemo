import {
    App,
    FoodTruckApi,
    IEpicServices,
    IFoodTruckApiRoutes,
    RootAction,
    rootEpic,
    rootReducer,
    RootState,
} from '@app/FoodTruck';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

declare var routes: IFoodTruckApiRoutes;
declare var preloadedState: RootState;

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, IEpicServices>({
    dependencies: {
        api: new FoodTruckApi(routes),
    },
});

const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
