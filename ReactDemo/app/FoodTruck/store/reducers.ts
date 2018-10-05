import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { entitiesReducer } from './entities/reducers';
import { truckDetailsReducer } from './truckDetails';
import { trucksReducer } from './trucksList';

export const rootReducer = combineReducers({
    trucksList: trucksReducer,
    truckDetails: truckDetailsReducer,
    entities: entitiesReducer,
});

export type RootState = StateType<typeof rootReducer>;
