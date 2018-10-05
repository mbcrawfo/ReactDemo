import { App, configureStore, FoodTruckApi, IFoodTruckApiRoutes, RootState } from '@app/FoodTruck';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

declare var routes: IFoodTruckApiRoutes;
declare var preloadedState: RootState;

const store = configureStore(preloadedState, {
    api: new FoodTruckApi(routes),
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
