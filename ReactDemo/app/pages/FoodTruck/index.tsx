import {
    App,
    FoodTruckApi,
    IEpicServices,
    IFoodTruckApiRoutes,
    IFoodTruckAppState,
    RootAction,
    rootEpic,
    rootReducer,
} from '@app/FoodTruck';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

// import { createLogger } from 'redux-logger';

declare var routes: IFoodTruckApiRoutes;
declare var preloadedState: IFoodTruckAppState;

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, IFoodTruckAppState, IEpicServices>({
    dependencies: {
        api: new FoodTruckApi(routes),
    },
});
const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(epicMiddleware/*, createLogger()*/)
    );

epicMiddleware.run(rootEpic);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
