import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { trucksReducer } from './Trucks';

export const rootReducer = combineReducers({
    foodTrucks: trucksReducer,
});

export type RootState = StateType<typeof rootReducer>;
