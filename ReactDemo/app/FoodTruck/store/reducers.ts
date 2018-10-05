import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { entitiesReducer } from './entities/reducers';
import { trucksReducer } from './trucksList';

export const rootReducer = combineReducers({
    trucksList: trucksReducer,
    entities: entitiesReducer,
});

export type RootState = StateType<typeof rootReducer>;
