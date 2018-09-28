import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import { createLogger } from 'redux-logger';

import { rootReducer, FoodTruckAction } from '@app/FoodTruck/reducers';
import { App } from '@app/FoodTruck/components/App';
import { rootEpic, IEpicServices } from '@app/FoodTruck/epics';
import { IFoodTruckApiRoutes, FoodTruckApi } from '@app/FoodTruck/api';
import { IFoodTruckState } from '@app/FoodTruck/state';

declare var routes: IFoodTruckApiRoutes;
declare var preloadedState: IFoodTruckState;

const epicMiddleware = createEpicMiddleware<FoodTruckAction, FoodTruckAction, IFoodTruckState, IEpicServices>({
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
