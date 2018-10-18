import { actions, App, configureStore, FoodTruckApi, RootState } from '@app/FoodTruck';
import { has, head, isEmpty } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import routes from '../../routes';

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

if (has(preloadedState, 'truckPaging.sortedTruckIds') && !isEmpty(preloadedState.truckPaging.sortedTruckIds))
{
    const id = head(preloadedState.truckPaging.sortedTruckIds)!;
    const action = actions.selectTruck(id);
    store.dispatch(action);
}
